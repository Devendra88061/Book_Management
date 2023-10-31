import { Router } from 'express';
import book from '../models/book';

export const books = Router();

// Add book record
books.post("/addBook", async (request: any, response: any) => {
    let bookData = await book.findOne({ bookName: request.body.bookName });
    if (bookData) {
        return response.status(400).send({
            message: "Book already exist!",
        });
    } else {
        if (!request.body.bookName || !request.body.authorName) {
            return response.status(400).send({
                message: "Required fields are missing",
            });
        } else {
            const bookObj = new book({
                bookName: request.body.bookName,
                authorName: request.body.authorName,
                amount: request.body.amount,
                type: request.body.type
            });
            await bookObj.save();
            response.status(200).send({
                message: "Successfully added a Book!",
                result: bookObj,
            });
        }
    }
});

// update book record
books.put("/updateBook/:id", async (request, response) => {
    const id = request.params.id;
    const body = request.body;
    try {
        const updatedBook = await book.findByIdAndUpdate(id, body, { new: true });
        if (!updatedBook) {
            return response.status(404).send({ message: "Book not found" });
        }
        return response.status(200).json({
            message: "Book updated successfully!",
            result: updatedBook,
        });
    } catch (error) {
        return response.status(500).send({
            message: "Something went wrong",
            error: error
        });
    }
});

// get all books record
books.get("/getAllBooks", async (request, response) => {
    try {
        const recordCount = await book.count();
        const booksData = await book.find();
        response.status(200).json({
            message: "successful fetching of Book data",
            recordCount: recordCount,
            result: booksData,
        });
    } catch (error) {
        response.status(500).json({
            message: "Something went wrong",
            error: error,
        });
    }
});

// get a single book Record
books.get("/getSingleBook/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const booksData = await book.findById({ _id: id });
        if (!booksData) {
            response.status(400).json({
                message: "Book record not found",
            });
        } else {
            response.status(200).json({
                message: "successful fetching of Book data",
                result: booksData,
            });
        }
    } catch (error) {
        response.status(500).json({
            message: "Something went wrong",
            error: error,
        });
    }
});