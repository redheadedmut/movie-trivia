import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const TriviaLogic = (props) => {
  const [trueFalse, setTrueFalse] = useState('')
  const [hasClicked, setHasClicked] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const [randomAnswers, setRandomAnswers] = useState([])
  const [score, setScore] = useState(0)

  let correctfalse = ''
  let nextQuestion = ''

  const handleAnswerClick = (value) =>{
    if(hasClicked === false){
      setHasClicked(true)
      if(value === props.questions[currentQuestion]?.correct ){
        console.log('true')
        setTrueFalse('Correct!!!')
        setScore(score + 1)
      } else{
        console.log('false')
        setTrueFalse('False!!!')
      }
    }
  }

  const createNextQuestionButton = () => {
    if(hasClicked == true){
      return(
        <h2 onClick={handleNextQuestion}>Next Question?</h2>
      )
    }
  }

  const handleNextQuestion = () =>{
    setTrueFalse('')
    setHasClicked(false)
    setCurrentQuestion(currentQuestion + 1)
  }

  const postGame = async (newGame) =>{
    try {
      const response = await fetch(`/api/v1/games`, {
        method:"POST",
        headers: new Headers ({
          "Content-Type" : "application/json"
        }),
        body: JSON.stringify(newGame),
      });
      if(!response.ok){
        if(response.status === 422){
          const responseBody = await response.json()
          const newErrors = translateServerErrors(responseBody.errors)
          console.log(newErrors)
        } else{
          throw (new Error(`${response.status} ${response.statusText}`))
        }
      }
      const responseBody = await response.json()
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  let gameOverMessage;
  if(currentQuestion >= props.questions.length){
    console.log(currentQuestion)
    let game = {isOver: true, score: score}
    gameOverMessage = (<h1 onClick={() => postGame(game)}>Game Over! Your score is {score}. Click here to save your game!</h1>)
  }

  const curentMovie = props.movies.find(movie => movie.id === props.questions[currentQuestion]?.movieId)


  return(
    <div>
      <h3>Your score is: {score}</h3>
      <h1>{curentMovie?.title}</h1>
      <h1>{props.questions[currentQuestion]?.prompt}</h1>
      <p onClick={() => handleAnswerClick(props.questions[currentQuestion]?.randomAnswers[0])}>{props.questions[currentQuestion]?.randomAnswers[0]}</p>
      <p onClick={() => handleAnswerClick(props.questions[currentQuestion]?.randomAnswers[1])}>{props.questions[currentQuestion]?.randomAnswers[1]}</p>
      <p onClick={() => handleAnswerClick(props.questions[currentQuestion]?.randomAnswers[2])}>{props.questions[currentQuestion]?.randomAnswers[2]}</p>
      <h2>{trueFalse}</h2>
      {createNextQuestionButton()}
      {gameOverMessage}
    </div>
  )

}

export default TriviaLogic