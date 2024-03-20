var express = require('express');
var path = require('path');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const db= require("./db/index");
var dbConnectionPool =db;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clubsRouter = require('./routes/clubs');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        return res.send({
            status,
            err: err.message instanceof Error ? err.message : err
        });
    };
    next();
});
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'a secret string',
    secure: false
}));

/*
app.use(function(req, res, next) {
    console.log("The current user is: " + req.session.user.username);
    next();
});
*/

// Error level intermediate key
app.use((err, req, res, next) => {
    if (err.message === 'No authorization token was found') {
        return res.send({
            status: 0,
            code: '500',
            message: 'Authentication failed! Please carry a token in the request header'

        });
    }
    if (err.message === 'jwt expired') {
        res.send({
            status: 0,
            code: '500',
            message: 'Token has expired, please log in again'

        });
    }
    res.send({
        status: 0,
        code: '500',
        message: err.message

    });
});
// Define upload
const storage = multer.diskStorage({
    // Save Path
     destination: function (req, file, cb) {
         cb(null, 'public/images/uploads');
        // Please note that the file path here is not the 'opposite path', just 'fill in' and start writing the root path
     },
     // File name saved in destination
     filename: function (req, file, cb) {
         let obj = ['.png', '.PNG', '.jpg', '.JPG', '.gif', '.GIF', '.jpeg', '.JPEG', '.webp', '.WEBP'];
         let hou = path.extname(file.originalname);

         cb(null, file.fieldname + '-' + Date.now() + '' + hou);
     }
  });
  let uploadFile = multer({ storage: storage });
  app.post('/uploadFile', uploadFile.single('file'), function (req, res, next) {
     // Req.file is the information of the 'file' file
     // Req. body will have text 'field data', 'if stored' in
     if (!req.file) return res.cc("Upload failed");
     res.send({
         status: '1',
         file: {
             name: req.file.originalname,
             url: '/images/uploads/' + req.file.filename,
             size: req.file.size
             // userinfo: req.user
         },
         code: 200
     });
  });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clubs', clubsRouter);

module.exports = app;
