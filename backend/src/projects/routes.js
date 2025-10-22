const { Router } = require("express");

const bookRouter = Router();

const { addBook, getAllBooks, getBook, updateBook, deleteBook, deleteAllBooks } = require("./controllers");

//add new book
bookRouter.post("/books/addBook", addBook);

//get all books
bookRouter.get("/books/getAllBooks", getAllBooks)

//get one book by title
bookRouter.get("/books/getBook", getBook)

//dynamically update book by title
bookRouter.put("/books/updateBook", updateBook)

//delete single book by title
bookRouter.delete("/books/deleteBook", deleteBook)

//delete all books
bookRouter.delete("/books/deleteAllBooks", deleteAllBooks)

module.exports = bookRouter;