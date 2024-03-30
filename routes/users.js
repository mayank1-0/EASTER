var express = require('express');
var router = express.Router();
const userService = require("../services/userService");

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

// populate user table
router.post('/populate', userService.populateUser);

router.post('/create', userService.createUser);
router.get('/fetchAll', userService.fetchAllUser);
router.put('/updateUser/:userName', userService.updateUser);
router.delete('/deleteUser/:userName', userService.deleteUser);

router.post('/userSignUp', userService.userSignUp);

module.exports = router;

