var express = require('express');
var router = express.Router();
const genreService = require("../services/genreService");

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
	let genres = [
		{
			id: 1,
			genre: 'Fiction',
		},
		{
			id: 2,
			genre: 'Dystopian',
		},
		{
			id: 3,
			genre: 'Romance',
		},
		{
			id: 4,
			genre: 'Classic',
		},
		{
			id: 5,
			genre: 'Magical Realism',
		},
		{
			id: 6,
			genre: 'Coming-of-Age',
		},
		{
			id: 7,
			genre: 'Fantasy',
		},
		{
			id: 8,
			genre: 'Satire',
		},
		{
			id: 9,
			genre: "Children's",
		},
	];
	res.render('genres', { user: null, genres: genres });
});

router.post('/update', async function (req, res, next) {
	res.render('index', { user: null });
});

// populate genre table
router.post('/populate', genreService.populateGenre);

router.post('/create', ensureAdminAuthenticated, genreService.createGenre);
router.post('/fetchAll', ensureAdminAuthenticated, genreService.fetchAllGenre);
router.post('/updateGenre/:genreName', ensureAdminAuthenticated, genreService.updateGenre);
router.post('/deleteGenre/:genreName', ensureAdminAuthenticated, genreService.deleteGenre);

module.exports = router;

