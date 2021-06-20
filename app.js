require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport")
var multer = require('multer');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

// var imagesRouter = require('./routes/images');
// var loginRouter = require('./routes/login')


var app = express();

app.use(cors())
app.use(express.json())
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
  // filename: (req, file, cb) => {
  //     cb(null, Date.now() + file.originalname);
  // }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

app.use(multer({storage:storage, fileFilter:fileFilter}).single("yourImage"))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
  next()
})


app.use('/', indexRouter);
app.use('/api', apiRouter);
// app.use('/uploads', imagesRouter);
// app.use('/login', loginRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
