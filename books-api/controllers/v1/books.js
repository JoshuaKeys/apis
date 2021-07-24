const asyncHandler = require("../../middleware/asyncHandler");
const Book = require("../../models/Book");
const ErrorResponse = require("../../utils/errorResponse");

// @route       /api/v1/books/
// @desc        Gets all books belonging to a user
// @access      Private
exports.getBooks = asyncHandler(async(req, res, next) => {
    // Should get books only for this user
    const owner = req.user;
    const books = await Book.find({
        owner
    });
    res.status(200).json({
        success: true,
        books: books
    })
});

// @route       /api/v1/books
// @desc        Adds a book belonging to a user
// @access      Private  
exports.addBook = asyncHandler(async (req, res, next) => {
    const owner = req.user;
    const {title, author, description} = req.body;

    const book = await Book.create({
        title, author, description, owner
    });
    
    await book.save();
    res.status(201).json({
        success: true,
        book
    })
});

// @route       /api/v1/books/:bookId
// @desc        Delete a book
// @access      Private
exports.deleteBook = asyncHandler(async(req, res, next) => {
    const bookId = req.params.bookId;
    const owner = req.user;
    
    // get specified book
    const book = await Book.findOne({
        _id: bookId
    })

    // Check if it is the owner who deletes it
    if(book.owner.toString() !== owner._id.toString()) {
        return next(new ErrorResponse('You are not the owner of this book, so you can\'t delete', 403));
    }
    const deletedBook = await Book.deleteOne({
        _id: bookId
    });

    res.status(200).json({
        success: true
    })
})