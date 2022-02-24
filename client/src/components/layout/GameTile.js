import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const GameTile = (props) =>{
  return(
    <div className="game-tile">
      <div className="leaderboard-score">{props.score}</div>
      <div className="leaderboard-name">{props.username}</div>
    </div>
  )
}

export default GameTile