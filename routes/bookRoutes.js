const express = require('express');
const router = express.Router();
const { createBook,getBooks } = require('../controllers/bookController');

// POST route to create a new book
router.post('/books', createBook);
router.get('/getbooks', getBooks);

module.exports = router;
