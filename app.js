//app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

var authorsRouter = require('./routes/authors');
var booksRouter = require('./routes/books');
var genresRouter = require('./routes/genres');
var languagesRouter = require('./routes/languages');
var usersRouter = require('./routes/users');


const db = require("./db/models/index");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
const secretKey = process.env.TOKEN_SECRET;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	session({
		secret: secretKey, // Change this to a secret key for session encryption
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/genres', genresRouter);
app.use('/languages', languagesRouter);
app.use('/', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

db.sequelize.sync();

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

