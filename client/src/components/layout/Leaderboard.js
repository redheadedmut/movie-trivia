import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GameTile from "./GameTile.js"

const Leaderboard = (props) =>{
  
  const [games, setGames] = useState([])
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/v1/users`)
      const body = await response.json()
      const userArr = body.users
      setUsers(userArr)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/v1/games`)
      const body = await response.json()
      const gamesArr = body.games
      setGames(gamesArr)
    } catch (error) {
      console.error(error)
    }
  }

  const gamesMap = games.map((game) => {
    const thisuser = users.find(user => user.id === game.userId)
    if(game.isOver === true){
      return(
        <GameTile
          key = {game.id}
          score = {game.score}
          username = {thisuser.username}
        />
      )
    }
  })

  useEffect(() => {
    fetchUsers()
    fetchGames()
  }, [])

  return(
    <div className="grid">
      <h1 className="leaderboard-header">Leaderboard</h1>
      {gamesMap}
    </div>
  )

}

export default Leaderboard