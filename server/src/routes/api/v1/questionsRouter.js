import express from "express";
import Question from "../../../models/Question.js";
import cleanUserInput from "../../../../services/cleanUserInput.js";
import Movie from "../../../models/Movie.js";


const questionsRouter = new express.Router();

let randomize = (ar, n) => {
  let arr = ar
  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

const findMovie = async (imbdId) =>{
  const movie = await Movie.query().findOne({ imbdId: imbdId });
  if(!movie){
    try {
      const response = await fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=${imbdId}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
          "x-rapidapi-key": "f4df5a8157msh5e3ac0f9bfa4059p1d05b1jsncbf45a44ddd5"
        }
      })
      const body = await response.json()
      console.log(body)
      const data = {
        imbdId: imbdId,
        title: body.Title,
        year: body.Year,
        description: body.Plot,
        photoUrl: body.Poster
      }
      const currentMovie = await Movie.query().findOne(data)
      if(!currentMovie){
        await Movie.query().insert(data)
      }
      const postedMovie = await Movie.query().findOne({ imbdId: imbdId });
      return(postedMovie.id)
    } catch (error) {
      console.error(error)
    }
  } else {
    return(movie.id)
  }
}

questionsRouter.get("/", async (req, res) => {
  try {
    const questions = await Question.query();
    questions.forEach((question) => {
      let arr = [question.correct, question.wrong1, question.wrong2]
      question.randomAnswers = randomize(arr, arr.length)
    })
    console.log(questions)
    return res.status(200).json({ questions: questions });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

questionsRouter.post("/", async (req, res) =>{
  try {
    const cleanInput = cleanUserInput(req.body)
    debugger
    const newQuestion = {};

    newQuestion.prompt = cleanInput.prompt
    newQuestion.correct = cleanInput.correct
    newQuestion.wrong1 = cleanInput.wrong1
    newQuestion.wrong2 = cleanInput.wrong2
    newQuestion.movieId = await findMovie(cleanInput.imbdId)
    newQuestion.userId = req.user.id
    console.log(newQuestion.movieId)
    const postedQuestion = await Question.query().insertAndFetch(newQuestion)
    return res.status(200).json({ question: postedQuestion })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error });
  }

})

export default questionsRouter