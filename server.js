//Look for dotenv
var dotenv=require("dotenv")
dotenv.config();
//Connection to mongodb
const mongoose = require("mongoose");
const db = mongoose.connection;
//error handling
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appointmentRouter = require('./routes/appointment');
var serviceRouter = require('./routes/service');
var dashboardRouter = require('./routes/dashboard');
var securityMiddleware = require('./middlewares/security');
var serviceManagementRouter = require('./routes/serviceManagement');

var app = express();
//dotenv to be found in database
//middleware
mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(securityMiddleware.checkJWT); 

//route handling
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/appointment',appointmentRouter);
app.use('/services', serviceRouter);
app.use('/dashboard', dashboardRouter);
app.use('/serviceManagement',serviceManagementRouter)

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//test environment
app.listen(3000, () => {
  console.log('Test environment is ready for launch!');
})

//deployment to bin
module.exports = app;






