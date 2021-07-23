// @route       /api/v1/books/
// @desc        Gets all books belonging to a user
// @access      Private
exports.getBooks = (req, res, next) => {
    res.status(200).json({
        success: true,
        books: [],
        user: req.user
    })
}