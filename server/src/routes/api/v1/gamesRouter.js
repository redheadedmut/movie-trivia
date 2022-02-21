import express from "express";
import Game from "../../../models/Game.js";

const gamesRouter = new express.Router();

gamesRouter.get("/", async (req, res) => {
  try {
    const games = await Game.query();

    games.sort(function (a, b) {
      return b.score - a.score;
    });
    return res.status(200).json({ games: games });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

gamesRouter.post("/", async (req,res) =>{
  const input = req.body
  input.userId = req.user.id

  try {
    const newGame = await Game.query().insertAndFetch(input)
    return res.status(200).json({ game: newGame })
  } catch (error) {
    return res.status(500).json({ errors: error });
  }

})

export default gamesRouter