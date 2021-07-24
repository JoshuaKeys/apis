const { Router } = require('express');
const { getBooks, addBook, deleteBook } = require('../../../controllers/v1/books');
const { protect } = require('../../../middleware/auth');

const router = Router();

router.route('/')
    .get(protect, getBooks)
    .post(protect, addBook);

router.route('/:bookId')
    .delete(protect, deleteBook)

module.exports = router;