const Author = require("./model");
const Book = require("../projects/projects");

const addAuthor = async (req, res) => {
    try {
        const newAuthor = await Author.create({
            author: req.body.author
        })
        res.status(201).json({message: `${req.body.author} successfully added.`, author: newAuthor});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);       
    }
};
const getAllAuthors = async (req, res) => {
    try {
        const allAuthors = await Author.findAll({});
        res.status(201).json({message: "All authors found", authors: allAuthors});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);        
    }
};

const getAuthorAndBooks = async (req, res) => {
    try {
        const authorAndBooks = await Author.findOne({
            where: { author: req.body.author },
            include: Book
        });
        res.status(201).json({message: "Author found with their books listed.", authorAndBooks: authorAndBooks}); 
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error); 
    }
}

module.exports = {
    addAuthor,
    getAllAuthors,
    getAuthorAndBooks
}