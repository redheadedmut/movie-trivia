import express from "express";
import Question from "../../../models/Question.js";

const questionsRouter = new express.Router();

questionsRouter.get("/", async (req, res) => {
  
  let randomize = (ar, n) => {
    let arr = ar
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr)
    return arr
  }

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

export default questionsRouter