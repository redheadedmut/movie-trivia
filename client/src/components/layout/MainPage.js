import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import OtherTriviaLogic from "./OtherTriviaLogic"
import TriviaLogic from "./TriviaLogic"

const MainPage = (props) =>{
  return(
    <div className="main-page">
      <h1>Welcome to Movie Trivia!</h1>
      <p className="thanks-message">Thanks for visiting! Down below are links to different areas of the site.</p>
      <div className="links">
        <Link className="link" to="/trivia">Trivia Game  </Link>
        <Link className="link" to="/new">Add a question  </Link>
        <Link className="link" to="/leaderboard">Leaderboard</Link>
      </div>
    </div>
  )
}

export default MainPage