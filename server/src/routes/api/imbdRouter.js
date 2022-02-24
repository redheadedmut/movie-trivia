import express from "express"
import got from 'got'
import fetch from 'node-fetch'
globalThis.fetch = fetch
import IMBD_CONFIG from '../../config.js'

const imbdRouter = new express.Router()

imbdRouter.get("/", async (req, res) =>{
  try {
    const response = await fetch("https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-random-movies&page=1", {
      "headers": {
        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        "x-rapidapi-key": IMBD_CONFIG.IMBD_KEY
      }
    }) 
    const body = await response.json()
    const movies = body.movie_results
    return res.status(200).json({ movies: movies })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

imbdRouter.get("/popular", async (req, res) =>{
  console.log(IMBD_CONFIG)
  try {
    const response = await fetch("https://imdb8.p.rapidapi.com/title/get-top-rated-movies", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": IMBD_CONFIG.IMBD_KEY,
      }
    })
    const body = await response.json()
    
    return res.status(200).json({ movies: body })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

imbdRouter.get("/:id", async (req, res) =>{
  try {
    const response = await fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${req.params.id}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": IMBD_CONFIG.IMBD_KEY
      }
    })
    const body = await response.json()
    return res.status(200).json({ movie: body })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})



export default imbdRouter