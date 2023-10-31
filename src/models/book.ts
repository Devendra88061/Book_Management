import mongoose from "mongoose";

// Define the book schema
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true,
    },
    authorName: {
        type: String,
        required: true,
        unique: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    publisher:{
        type: String,
        required: false,
    },
    type:{
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
// Create the Book model
const book = mongoose.model("book", bookSchema);
export default book;
