const { Router } = require('express');
const { getBooks } = require('../../../controllers/v1/books');
const { protect } = require('../../../middleware/auth');

const router = Router();

router.route('/').get(protect, getBooks);


module.exports = router;