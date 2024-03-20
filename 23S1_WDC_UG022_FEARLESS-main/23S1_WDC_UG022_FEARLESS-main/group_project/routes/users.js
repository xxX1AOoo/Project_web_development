var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/images/uploads/' });
var nodemailer = require('nodemailer');

/* manager email data */
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  auth: {
   user: '3354807369@qq.com',
   pass: 'rudssgsvllzudaia'
  }
});

// /////////////////////////

router.use('/', function(req, res, next) {
  if(!('user' in req.session)){
    res.sendStatus(403);
  } else {
    next();
  }
});

// ////////////////////////

/* GET /users */
router.get('/', function(req, res, next) {
  console.log('USER: ' + req.session.user.username);
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "SELECT username,first_name,last_name,avatar,email FROM Users WHERE username = ?";
    connection.query(query,[req.session.user.username], function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});


/* GET user-clubs-info  */
router.get('/clubs-info', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT DISTINCT Clubs.club_name FROM Clubs
    INNER JOIN Members ON Members.club_id = Clubs.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE Users.username = ?`;
    connection.query(query,[req.session.user.username], function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* users(members) get posts */
router.get('/members/posts.json', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT DISTINCT Posts.post_title, Posts.post_content, Clubs.club_name FROM Posts
    INNER JOIN Clubs ON Clubs.club_id = Posts.club_id
    INNER JOIN Members ON Members.club_id = Posts.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE username = ?`;
    connection.query(query, [req.session.user.username], function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* clubs GET member-only posts */
router.get('/clubs/posts.json', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT title,content,is_public,created FROM Posts
    INNER JOIN Clubs ON Clubs.club_id = Posts.club_id
    INNER JOIN Members ON Members.club_id = Posts.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE username = ?`;
    connection.query(query, [req.session.user.username], function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* user update information */
router.post('/update', function(req, res, next) {
  if(req.body.first_name === "" || req.body.last_name === "") {
    res.sendStatus(400);
  } else {
    req.pool.getConnection(function(cerr, connection) {
      if(cerr) {
        res.sendStatus(500);
        return;
      }

      let q = `UPDATE Users
      SET first_name = ?, last_name = ?, email = ?
      WHERE username = ?;`;

      let r = req.body;

      connection.query(q,[r.first_name,r.last_name,r.email,req.session.user.username],function(qerr,rows,fields){
        connection.release();
        if(qerr) {
          res.sendStatus(401);
          return;
        }
        res.end();
      });
    });
  }
});

/* users upload & update avatar */
router.post('/upload', upload.single('avatar'), function(req, res, next) {
  // users[req.session.username].avatar = 'images/uploads/' + req.file.filename;
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let q = `UPDATE Users
    SET avatar = 'images/uploads/${req.file.filename}'
    WHERE username = ?`;
    connection.query(q,[req.session.user.username],function(qerr,rows,fields){
      connection.release();
      if(qerr) {
        res.sendStatus(401);
        return;
      }
      res.send('Updated successfully!');
    });
  });
});


/* check joined club */
router.get('/checkjoined/:id', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT Users.user_id, Clubs.club_id FROM Members
    INNER JOIN Clubs ON Clubs.club_id = Members.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE Users.user_id = ? AND Clubs.club_id = ${req.params.id}`;
    connection.query(query, [req.session.user.user_id], function(qerr, rows, fields) {
      connection.release();
      if(qerr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* join club */
router.post('/join', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let q = `INSERT INTO Members (
                user_id,
                club_id
              ) VALUES (
                ${req.session.user.user_id},
                ${req.body.clubid}
              );`;
    connection.query(q,function(qerr,rows,fields){
      connection.release();
      if(qerr) {
        res.sendStatus(401);
        return;
      }
      res.end();
    });
  });
});


/* users(members) on club page get all posts */
router.get('/posts.json/:id', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT DISTINCT Posts.* FROM Posts
    INNER JOIN Clubs ON Clubs.club_id = Posts.club_id
    INNER JOIN Members ON Members.club_id = Clubs.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE Posts.is_public = '0' AND Clubs.club_id = ${req.params.id} AND Users.user_id = ${req.session.user.user_id}`;
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


/* check members */
router.get('/manager/members/:id', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT Users.first_name, Users.last_name FROM Users
    INNER JOIN Members ON Members.user_id = Users.user_id
    INNER JOIN Clubs ON Clubs.club_id = Members.club_id
    WHERE Clubs.club_id = ${req.params.id}`;
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


/* manager render post */
router.get('/manager/renderPost/:id', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let query = `SELECT is_manager FROM Members
    INNER JOIN Clubs ON Clubs.club_id = Members.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE Clubs.club_id = ${req.params.id} AND Users.user_id = ${req.session.user.user_id}`;
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


/* new post update */
router.post('/manager/newpost/:id', function(req, res, next) {
  let post = req.body;

  if('title' in post && 'content' in post){
    req.pool.getConnection(function(cerr, connection) {
      if(cerr) {
        console.log("outer error");
        res.sendStatus(500);
        return;
      }

      let query = `INSERT INTO Posts ( post_title, post_content, is_public, created, author, club_id )
                    VALUES ( ?, ?, ?, CURRENT_TIMESTAMP(), ${req.session.user.user_id}, ${req.params.id} );`;

      let t = post.title;
      let c = post.content;
      let s = post.is_public;

      connection.query(query,[t,c,s],function(qerr, rows, fields){
        connection.release();
        if(qerr) {
          console.log("inner error");
          res.sendStatus(500);
          return;
        }
        res.end();
      });
    });
  }
});


/* new event */
router.post('/manager/newevent/:id', function(req, res, next) {
  let event = req.body;

  if('title' in event && 'content' in event && 'time' in event && 'location' in event){
    req.pool.getConnection(function(cerr, connection) {
      if(cerr) {
        console.log("outer error");
        res.sendStatus(500);
        return;
      }

      let query = `INSERT INTO Events ( event_name, event_content, time, location, club_id )
                    VALUES ( ?, ?, ?, ?, ? );`;

      let n = event.title;
      let c = event.content;
      let t = event.time;
      let l = event.location;

      connection.query(query,[n,c,t,l, [req.params.id]],function(qerr, rows, fields){
        connection.release();
        if(qerr) {
          console.log("inner error");
          res.sendStatus(500);
          return;
        }
        res.end();
      });
    });
  }
});


/* RSVP attend */
router.post('/attend', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      console.log("outer error");
      res.sendStatus(500);
      return;
    }

    let query = `INSERT INTO RSVP ( is_attending, event_id, club_id, user_id )
                  VALUES ( ?, ?, ?, ${req.session.user.user_id} );`;

    let i = req.body.is_attending;
    let e = req.body.event_id;
    let c = req.body.club_id;

    connection.query(query,[i,e,c],function(qerr, rows, fields){
      connection.release();
      if(qerr) {
        console.log("inner error");
        res.sendStatus(500);
        return;
      }
      res.end();
    });
  });
});


/* users GET RSVP */
router.get('/rsvp.json', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let q = `SELECT DISTINCT Events.*, Clubs.club_id, Clubs.club_name, RSVP.is_attending FROM Events
    INNER JOIN Clubs ON Clubs.club_id = Events.club_id
    INNER JOIN Members ON Members.club_id = Clubs.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    LEFT JOIN RSVP ON RSVP.user_id = Users.user_id AND RSVP.event_id = Events.event_id AND RSVP.club_id = Clubs.club_id
    WHERE Users.user_id = ?`;
    connection.query(q,[req.session.user.user_id],function(qerr,rows,fields){
      connection.release();
      if(qerr) {
        res.sendStatus(401);
        return;
      }
      res.json(rows);
    });
  });
});


/* GET /to-admin */
router.get('/to-admin', function(req, res, next) {
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let q = `SELECT is_admin FROM Users WHERE username = ?`;
    connection.query(q,[req.session.user.username],function(qerr,rows,fields){
      connection.release();
      if(qerr) {
        res.sendStatus(401);
        return;
      }
      res.json(rows);
    });
  });
});


/* manager: event share button */
router.get('/manager/eventShare/:id', function(req,res,next){
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let q = `SELECT is_manager FROM Members
    INNER JOIN Clubs ON Clubs.club_id = Members.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id
    WHERE Clubs.club_id = ${req.params.id} AND Users.user_id = ${req.session.user.user_id}`;
    connection.query(q,[req.session.user.username],function(qerr,rows,fields){
      connection.release();
      if(qerr) {
        res.sendStatus(401);
        return;
      }
      res.json(rows);
    });
  });
});


/* manager: check event attend */
router.get('/manager/checkattend/:id', function(req,res,next){
  req.pool.getConnection(function(cerr, connection) {
    if(cerr) {
      res.sendStatus(500);
      return;
    }
    let q = `SELECT Events.event_name, Users.first_name, Users.last_name FROM RSVP
    INNER JOIN Clubs ON Clubs.club_id = RSVP.club_id
    INNER JOIN Members ON Members.club_id = Clubs.club_id
    INNER JOIN Users ON Users.user_id = Members.user_id AND RSVP.user_id = Users.user_id
    INNER JOIN Events ON Events.club_id = Clubs.club_id AND Events.event_id = RSVP.event_id
    WHERE RSVP.is_attending = '1' AND Clubs.club_id = ${req.params.id}`;
    connection.query(q,[req.session.user.username],function(qerr,rows,fields){
      connection.release();
      if(qerr) {
        res.sendStatus(401);
        return;
      }
      res.json(rows);
    });
  });
});

module.exports = router;
