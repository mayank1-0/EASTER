var express = require('express');
var router = express.Router();
const authorService = require("../services/authorService");

router.get('/', async function (req, res, next) {
	let authors = [
		{
			id: 1,
			author: 'Harper Lee',
		},
		{
			id: 2,
			author: 'George Orwell',
		},
		{
			id: 3,
			author: 'Jane Austen',
		},
		{
			id: 4,
			author: 'F. Scott Fitzgerald',
		},
		{
			id: 5,
			author: 'Gabriel Garcia Marquez',
		},
		{
			id: 6,
			author: 'J.D. Salinger',
		},
		{
			id: 7,
			author: 'Paulo Coelho',
		},
		{
			id: 8,
			author: 'J.K. Rowling',
		},
		{
			id: 9,
			author: 'J.R.R. Tolkien',
		},
		{
			id: 10,
			author: 'Miguel de Cervantes',
		},
	];
	res.render('authors', { user: null, authors: authors });
});

router.post('/update', async function (req, res, next) {
	res.render('index', { user: null });
});

// populate author table
router.post('/populate', authorService.populateAuthor);

router.post('/create', authorService.createAuthor);
router.get('/fetchAll', authorService.fetchAllAuthor);
router.put('/updateAuthor/:authorName', authorService.updateAuthor);
router.delete('/deleteAuthor/:authorName', authorService.deleteAuthor);

module.exports = router;

