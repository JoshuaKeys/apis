const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        unique: true
    },
    author: {
        type: String,
        required: [true, 'Book author is required']
    },
    description: {
        type: String,
        required: [true, 'Book description is required']
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = Book = model('Book', BookSchema)