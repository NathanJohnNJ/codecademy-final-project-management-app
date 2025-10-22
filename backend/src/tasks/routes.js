const { Router } = require("express");

const genreRouter = Router();

const { addGenre, getAllGenres, getGenreAndBooks, deleteGenre } = require("./controllers");

genreRouter.post("/genres/addGenre", addGenre);

genreRouter.get("/genres/getAllGenres", getAllGenres);

genreRouter.get("/genres/getGenreAndBooks", getGenreAndBooks);

genreRouter.delete("/genres/deleteGenre", deleteGenre);

module.exports = genreRouter;