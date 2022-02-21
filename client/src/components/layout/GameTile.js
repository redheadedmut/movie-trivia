import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const GameTile = (props) =>{
  return(
    <div>
      {props.score}
      {props.username}
    </div>
  )
}

export default GameTile