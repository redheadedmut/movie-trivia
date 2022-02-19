import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const OtherTriviaLogic = (props) =>{
  const [selectedAnswer, setSelectedAnswer] = useState()

  let question;

  function shuffle(array) {
    var i = array.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i+1));

      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

  function generateQuestion(num){

    const randMovies = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);

    if(num === 1){
      const selectedMovies = shuffle([randMovies[0], randMovies[1], randMovies[2]])
      const answerHandler = () =>{
        console.log(props.movies[selectedAnswer])
        console.log(props.movies[randMovies[0]])
        if(props.movies[selectedAnswer]?.year === props.movies[randMovies[0]]?.year){
          return(<h1>Correct!!!</h1>)
        } else{
          return(<h1>False!!!!!</h1>)
        }
      }
      return(
        <div>
          <h1>When did {props.movies[randMovies[0]]?.title} release?</h1>
          <p onClick={() => setSelectedAnswer(0)}>{props.movies[selectedMovies[0]]?.year}</p>
          <p onClick={() => setSelectedAnswer(1)}>{props.movies[selectedMovies[1]]?.year}</p>
          <p onClick={() => setSelectedAnswer(2)}>{props.movies[selectedMovies[2]]?.year}</p>
          {answerHandler()}
        </div>
      )
    }
  }
  

  return(
    <div>
      {generateQuestion(1)}
    </div>
  )
}

export default OtherTriviaLogic