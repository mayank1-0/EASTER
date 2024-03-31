var express = require('express');
var router = express.Router();
const userService = require("../services/userService");
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: null });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express', user: null });
});


router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Express', user: null });
});

router.post('/signin', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}));


// populate user table
router.post('/populate', userService.populateUser);

router.post('/create', userService.createUser);
router.get('/fetchAll', userService.fetchAllUser);
router.put('/updateUser/:userName', userService.updateUser);
router.delete('/deleteUser/:userName', userService.deleteUser);

router.post('/userSignUp', userService.userSignUp);

module.exports = router;

