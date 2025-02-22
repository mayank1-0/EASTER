var express = require('express');
var router = express.Router();
const languageService = require("../services/languageService");

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
	  return next();
	}
	res.status(403).json({
	  status: "fail",
	  data: {
		statusCode: 403,
		result: "Unauthorized.",
	  },
	});
  };
  
  const ensureAdminAuthenticated = (req, res, next) => {
	if (req.isAuthenticated() && req.user.role == 'admin') {
	  return next();
	}
	res.status(403).json({
	  status: "fail",
	  data: {
		statusCode: 403,
		result: "Unauthorized",
	  },
	});
  };

router.get('/', async function (req, res, next) {
	let languages = [
		{
			id: 1,
			language: 'English',
		},
		{
			id: 2,
			language: 'Spanish',
		},
		{
			id: 3,
			language: 'French',
		},
		{
			id: 4,
			language: 'German',
		},
		{
			id: 5,
			language: 'Italian',
		},
		{
			id: 6,
			language: 'Russian',
		},
		{
			id: 7,
			language: 'Chinese',
		},
		{
			id: 8,
			language: 'Japanese',
		},
		{
			id: 9,
			language: 'Portuguese',
		},
		{
			id: 10,
			language: 'Italian',
		},
	];
	res.render('languages', { user: null, languages: languages });
});

router.post('/update', async function (req, res, next) {
	res.render('index', { user: null });
});

// populate genre table
router.post('/populate', languageService.populateLanguage);

router.post('/create', ensureAdminAuthenticated, languageService.createLanguage);
router.post('/fetchAll', ensureAdminAuthenticated, languageService.fetchAllLanguage);
router.post('/updateLanguage/:languageName', ensureAdminAuthenticated, languageService.updateLanguage);
router.post('/deleteLanguage/:languageName', ensureAdminAuthenticated, languageService.deleteLanguage);

module.exports = router;

