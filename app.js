//app.js

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import mssql for database connection
const sql = require('mssql');

// Database configuration
const config = {
	user: 'root',
	password: 'Root',
	server: 'localhost',
	database: 'library_db',
	port: 3306,
	options: {
	  encrypt: true // Use encryption if needed
	}
  };
  

// Connect to the database
sql.connect(config)
  .then(pool => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var genresRouter = require('./routes/genres');
var languagesRouter = require('./routes/languages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);
app.use('/languages', languagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

