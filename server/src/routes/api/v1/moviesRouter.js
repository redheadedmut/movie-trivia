import express from "express";
import Movie from "../../../models/Movie.js";

const moviesRouter = new express.Router();

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.query();
    console.log(movies)
    return res.status(200).json({ movies: movies });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default moviesRouter