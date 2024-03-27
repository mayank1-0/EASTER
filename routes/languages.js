var express = require('express');
var router = express.Router();

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

module.exports = router;

