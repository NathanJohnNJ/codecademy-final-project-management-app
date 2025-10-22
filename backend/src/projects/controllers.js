const Book = require("./model")
const Author = require("../users/model")
const Genre = require("../tasks/model")

const addBook = async (req, res) => {
    try {
        const author = await Author.findOne({
            where: {author: req.body.author}
        })
        const genre = await Genre.findOne({
            where: {genre: req.body.genre}
        })
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            GenreId: genre.id,
            AuthorId: author.id
        })
        res.status(201).json({message: `${req.body.title} successfully added.`, book: newBook});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);       
    }
};

const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.findAll({})
        res.status(201).json({message: "All books found", books: allBooks});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);        
    }
};

const getBook = async (req, res) => {
    try {
        const book = await Book.findOne({
            where: {
                title: req.body.title
            }
        })
        res.status(201).json({message: `${req.body.title} found.`, book: book});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);        
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.update(
            { 
                title: req.body.newTitle 
            }, {
                where: {
                    title: req.body.title
                }
            }
        )
        res.status(201).json({message: `${req.body.title} successfully updated to ${req.body.newTitle}.`, book: updatedBook});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error); 
    }
}

const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.deleteOne({
            title: req.body.title
        });
        res.status(201).json({message: `${req.body.title} successfully deleted.`, book: deletedBook});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error); 
    }
};

const deleteAllBooks = async (req, res) => {
    try {
        const deletedBooks = await Book.deleteMany({});
        res.status(201).json({message: "All books successfully deleted.", books: deletedBooks});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error); 
    }
};

module.exports = {
    addBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
    deleteAllBooks
}