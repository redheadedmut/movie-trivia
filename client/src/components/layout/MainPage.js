import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import OtherTriviaLogic from "./OtherTriviaLogic"
import TriviaLogic from "./TriviaLogic"

const MainPage = (props) =>{
  
  const [questions, setQuestions] = useState([])

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/v1/questions`)
      const body = await response.json()
      const questionArr = body.questions
      setQuestions(questionArr)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])


  let randomize = (ar, n) => {
    let arr = ar
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr)
    return arr
  }
  let randomizedQuestions = randomize(questions, questions?.length)

 

  return(
    <div>
      <TriviaLogic questions = {randomizedQuestions} randomize ={randomize}/>
    </div>
  )
}

export default MainPage