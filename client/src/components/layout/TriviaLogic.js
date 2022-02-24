import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const TriviaLogic = (props) => {
  const [trueFalse, setTrueFalse] = useState('')
  const [hasClicked, setHasClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
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
        <h2 className="game-over" onClick={handleNextQuestion}>Next Question?</h2>
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
      setRedirect(true)
      return true
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  let showAnswers = true;
  let gameOverMessage;
  let showScore = (<h3>Score: {score}</h3>);
  if(currentQuestion >= props.questions.length || currentQuestion >= 10){
    console.log(currentQuestion)
    let game = {isOver: true, score: score}
    showAnswers = false
    showScore = ''
    if(props.user){
      gameOverMessage = (<h1 className="game-over" onClick={() => postGame(game)}>Game Over! Your score is {score}. Click here to save your score!</h1>)
    } else{
      gameOverMessage = (<h1 className="game-over" onClick={() => setRedirect(true)}>Game Over! Your score is {score}. Sign in to save your score!</h1>)
    }
  }

  const showAnswersFunction = () =>{
    if(showAnswers === true){
      return(
        <div>
          <input type="button" className="answer" onClick={() => handleAnswerClick(props.questions[currentQuestion]?.randomAnswers[0])} value={props.questions[currentQuestion]?.randomAnswers[0] || ''}/>
          <input type="button" className="answer" onClick={() => handleAnswerClick(props.questions[currentQuestion]?.randomAnswers[1])} value={props.questions[currentQuestion]?.randomAnswers[1] || ''}/>
          <input type="button" className="answer" onClick={() => handleAnswerClick(props.questions[currentQuestion]?.randomAnswers[2])} value={props.questions[currentQuestion]?.randomAnswers[2] || ''}/>
        </div>
      )
    }
  }

  const curentMovie = props.movies.find(movie => movie.id === props.questions[currentQuestion]?.movieId)

  if (redirect) {
    location.href = "/leaderboard";
  }

  return(
    <div className="grid-x grid-margin-x trivia-page">
      <div className="cell small-6 left-side">
        <h1>{props.questions[currentQuestion]?.prompt}</h1>
        <h2>{trueFalse}</h2>
        {showAnswersFunction()}
        {createNextQuestionButton()}
        {gameOverMessage}
        <div className="score">
          {showScore}
        </div>
      </div>
      <div className="cell small-6 right">
        <h1 className="movie-title">{curentMovie?.title}</h1>
        <div className="right-side">
          <img src={curentMovie?.photoUrl}/>
          <p className="description">{curentMovie?.description}</p>    
        </div>
      </div>
    </div>
  )
  
}

export default TriviaLogic