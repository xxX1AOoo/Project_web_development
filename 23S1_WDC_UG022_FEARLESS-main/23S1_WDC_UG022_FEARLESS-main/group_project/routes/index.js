var express = require('express');
var router = express.Router();
var argon2 = require('argon2');

/// -----------google----------- //
const CLIENT_ID = '771788160474-81nmstkc6prok7llkl9q3q4nclfu0qmt.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
// -----------google----------- //

const sanitizeHtml = require('sanitize-html');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* login */
router.post('/login', async function(req, res, next) {
  if ('client_id' in req.body){
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
      // console.log(payload['sub']);
      // console.log(payload['email']);
      // If request specified a G Suite domain:
      // const domain = payload['hd'];

    req.pool.getConnection(function (cerr, connection){
      if(cerr) {
        res.sendStatus(500);
        return;
      }
      let q = "SELECT * From Users WHERE email = ?";
      connection.q(q, [payload['email']], function(qerr, rows, fields){
        connection.release();
        if(qerr) {
          res.sendStatus(500);
          return;
        }
        if(rows.length > 0){
          // There is a user
          [req.session.user] = rows;
          res.json(req.session.user);
        } else {
          // No user
          res.sendStatus(401);
        }
      });
    });

  } else if ('username' in req.body && 'password' in req.body){
    req.pool.getConnection(function(cerr, connection) {
      if(cerr) {
        res.sendStatus(500);
        return;
      }
      let query = "SELECT * FROM Users WHERE username = ?";
      connection.query(query, [req.body.username], async function(qerr,rows,fields){
        connection.release();
        if(qerr) {
          res.sendStatus(500);
          return;
        }

        if(rows.length > 0){
          // there is a user
          /*
          [req.session.user] = rows;
          */

          if (await argon2.verify(rows[0].pass, req.body.password)){
            let [user_props] = rows;
            delete user_props.pass;
            req.session.user = user_props;
            res.json(req.session.user);
          } else {
            // password does not match
            res.sendStatus(401);
          }

        } else {
          // no user
          res.sendStatus(401);
        }
      });
    });
  } else {
    res.sendStatus(401);
  }
});


/* logged in */
router.get('/openlogin', function(req, res, next) {
  if(!req.session.user){
    res.end();
  } else {
    res.sendStatus(401);
  }
});


/* signup */
router.post('/signup', function(req, res, next) {
  if('username' in req.body && 'password' in req.body) {
    req.pool.getConnection(async function(cerr, connection) {
      if(cerr) {
        res.sendStatus(500);
        return;
      }
      const hash = await argon2.hash(req.body.password);

      let q = `INSERT INTO Users (
                  username,
                  pass,
                  first_name,
                  last_name,
                  email
                ) VALUES (
                  ?,
                  ?,
                  ?,
                  ?,
                  ?
                );`;

      let r = req.body;

      connection.query(q,[r.username,hash,r.first,r.last,r.email],function(qerr,rows,fields){
        connection.release();
        if(qerr) {
          res.sendStatus(401);
          return;
        }
        res.end();
      });
    });
  } else {
    res.sendStatus(401);
  }
});


/* logout */
router.post('/logout', function(req, res, next) {
  if('user' in req.session){
    delete req.session.user;
    res.end();
  } else {
    res.send(403);
  }
});


/* GET clubs on clubs.html */
router.get('/clubs', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "SELECT club_id, club_name, poster FROM Clubs";
    connection.query(query, function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* GET a club page on clubs.html */
router.get('/clubs.html/:id', function (req, res, next) {
try{
  let query = `SELECT  * FROM Clubs WHERE club_id = ${req.params.id}`;
  let query1 = `SELECT * FROM Events WHERE club_id = ${req.params.id}`;
  // let query2 = `SELECT  * FROM Posts WHERE club_id = ${req.params.id}`;
    let aa = new Promise(function (resolve, reject) {
    req.pool.getConnection(function (cerr, connection) {
    connection.query(query, function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        reject(cerr);
        res.sendStatus(500);
        return;
      }
      resolve(rows[0]);
    });
  });
  });

  let bb = new Promise(function (resolve, reject) {
    req.pool.getConnection(function (cerr, connection) {
    connection.query(query1, function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        reject(cerr);
        res.sendStatus(500);
        return;
      }
      resolve(rows);
    });
  });
  });

  Promise.all([aa,bb]).then((res1) => {
    res.send({
      status: 1,
      data: {
      ...res1[0],
      events: res1[1]
    },
    code: 200
  });
  }).catch((error) => {
    res.send({
      status: 0,
      err: error,
      code: 500
    });
  });
} catch(error){
  console.log();
}
});


/* GET events data on events.html */
router.get('/events.json', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT club_name,Events.* FROM Events
    INNER JOIN Clubs ON Clubs.club_id = Events.club_id`;
    connection.query(query, function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


/* GET /posts.json */
router.get('/posts.json/:id',function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT Posts.* FROM Posts
    INNER JOIN Clubs ON Clubs.club_id = Posts.club_id
    WHERE Posts.is_public = '1' AND Clubs.club_id = ${req.params.id}`;
    connection.query(query, function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

module.exports = router;
