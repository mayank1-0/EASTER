var express = require('express');
var router = express.Router();

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

module.exports = router;
