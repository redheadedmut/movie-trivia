/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import GameSeeder from "./seeders/GameSeeder.js"
import MovieSeeder from "./seeders/MovieSeeder.js"
import QuestionSeeder from "./seeders/QuestionSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here

    console.log("Seeding users...")
    await UserSeeder.seed()

    console.log("Seeding games...")
    await GameSeeder.seed()

    console.log("Seeding Movies...")
    await MovieSeeder.seed()

    console.log("Seeding questions...")
    await QuestionSeeder.seed

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder