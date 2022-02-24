import Game from "../../models/Game.js"
import User from "../../models/User.js"

class GameSeeder {
  static async seed(){
    const nick = await User.query().findOne({ email: "nick@nick.com" })
    const finn = await User.query().findOne({ email: "finn@finn.com" })

    await Game.query().insert({id: nick.id, userId: nick.id, score: 4, isOver: true})
    await Game.query().insert({id: finn.id,userId: finn.id, score: 3, isOver: true})
    await Game.query().insert({id: finn.id,userId: finn.id, score: 6, isOver: true})

  }
}

export default GameSeeder

