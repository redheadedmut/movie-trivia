import Movie from "../../models/Movie.js"
import User from "../../models/User.js"
import fetch from "node-fetch";


class MovieSeeder {

  static async seed(){

    const movieIds = ["tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083"]

    await Promise.all(movieIds.map( async (movie) => {
      try {
        const response = await fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${movie}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": "f4df5a8157msh5e3ac0f9bfa4059p1d05b1jsncbf45a44ddd5"
          }
        })
        const body = await response.json()
        console.log(body)
        const data = {
          imbdId: movie,
          title: body.Title,
          year: body.Year,
          description: body.Plot,
          photoUrl: body.Poster
        }
        const currentMovie = await Movie.query().findOne(data)
        if(!currentMovie){
          await Movie.query().insert(data)
      }
      } catch (error) {
        console.error(error)
      }
    }))
  }
}

export default MovieSeeder