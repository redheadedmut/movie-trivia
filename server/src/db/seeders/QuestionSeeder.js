import User from "../../models/User.js"
import Movie from "../../models/Movie.js"
import Question from "../../models/Question.js"

class QuestionSeeder {
  static async seed() {
    const nick = await User.query().findOne({ email: "nick@nick.com" })
    const finn = await User.query().findOne({ email: "finn@finn.com" })
    const shawshank = await Movie.query().findOne({ imbdId: "tt0111161" })
    const godfather = await Movie.query().findOne({ imbdId: "tt0068646" })
    const lighthouse = await Movie.query().findOne({ imbdId: "tt7984734" })
    
    const questionData = [
      {
        prompt: "What year was The Godfather released?",
        correct: "1972",
        wrong1: "1974",
        wrong2: "1984",
        movieId: godfather.id,
        userId: nick.id
      },
      {
        prompt: "Who plays Vito Corleone in The Godfather?",
        correct: "Marlon Brando",
        wrong1: "Al Pacino",
        wrong2: "James Caan",
        movieId: godfather.id,
        userId: nick.id
      },
      {
        prompt: "Who directed The Shawshank Redemption",
        correct: "Frank Darabont",
        wrong1: "Steven Spielberg",
        wrong2: "Stephen King",
        movieId: shawshank.id,
        userId: finn.id
      },
      {
        prompt: "What's the name of the warden from Shawshank Redemption",
        correct: "Warden Norton",
        wrong1: "Warden Freeman",
        wrong2: "Warden Dufresne",
        movieId: shawshank.id,
        userId: finn.id
      },
      {
        prompt: "Who does Robert Pattinson play in The Lighthouse?",
        correct: "Thomas Wake",
        wrong1: "Ephraim Winslow",
        wrong2: "Thomas Finnegan",
        movieId: lighthouse.id,
        userId: finn.id
      },
      {
        prompt: "What's bad luck to kill as a wickie?",
        correct: "Seagulls",
        wrong1: "Lobsters",
        wrong2: "Mermaids",
        movieId: lighthouse.id,
        userId: finn.id
      },
    ]

    for (const singleQuestion of questionData){
      const currentQuestion = await Question.query().findOne(singleQuestion)
      if(!currentQuestion){
        await Question.query().insert(singleQuestion)
      }
    }
  }
}

export default QuestionSeeder