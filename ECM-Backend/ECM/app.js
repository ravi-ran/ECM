
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const employeeRouter = require('./routes/employeeRouter');
const managerRouer = require('./routes/managerRouter');

var app = express();

const facade  = require('./public/models/facade');
const eraseDbOnSync = true;         //to re-initialse db on every server start.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee',employeeRouter);
app.use('/manager', managerRouer);
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


facade.connectDB().then(async () => {
  try {
    if(eraseDbOnSync) {
      await facade.models.employee.init();
      await facade.models.manager.init();

      await facade.models.employee.collection.drop();
      await facade.models.manager.collection.drop();
      //initialising employee and manager table
      await facade.initialiseDB.initialiseEmployee();
      await facade.initialiseDB.initialiseManager();
  
    }
    app.listen(5000, () => {
      console.log('***************app is running and connected to mongoose*****************');
    });
  } catch (error) {
    console.log('Error in connect DB app.js');
    console.log(error);    
  }

})

module.exports = app;
