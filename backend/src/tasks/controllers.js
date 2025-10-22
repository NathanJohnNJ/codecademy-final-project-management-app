const Genre = require("./model");
const Book = require("../projects/model");

const addGenre = async (req, res) => {
    try {
        const newGenre = await Genre.create({
            genre: req.body.genre
        })
        res.status(201).json({message: `${req.body.genre} successfully added.`, genre: newGenre});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);
    }
};

const getAllGenres = async (req, res) => {
    try {
        const allGenres = await Genre.findAll({})
        res.status(201).json({message: "All genres found", genres: allGenres});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);        
    }
};

const getGenreAndBooks = async (req, res) => {
    try {
        const genreAndBooks = await Genre.findOne({
            where: {
                genre: req.body.genre
            },
            include: Book
        })
        res.status(201).json({message: `${req.body.genre} genre and books found.`, genreAndBooks: genreAndBooks});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);        
    }
};

const deleteGenre = async (req, res) => {
    try {
        const deletedGenre = await Genre.deleteOne({
            genre: req.body.genre
        });
        res.status(201).json({message: `${req.body.genre} genre successfully deleted.`, book: deletedGenre});
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error); 
    }
};

module.exports = {
    addGenre,
    getAllGenres,
    getGenreAndBooks,
    deleteGenre
};