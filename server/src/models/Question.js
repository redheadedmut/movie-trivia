const Model = require("./Model.js")

class Question extends Model {
  static get tableName() {
    return "questions";
  }

  static get relationMappings(){
    const User = require("./User.js")
    const Movie = require("./Movie.js")

    return{
      users:{
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "questions.userId",
          to: "users.id"
        }
      },
      movies:{
        relation: Model.BelongsToOneRelation,
        modelClass: Movie,
        join: {
          from: "questions.movieId",
          to: "movies.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["prompt", "correct", "wrong1", "wrong2"],

      properties: {
        prompt: { type: "string"},
        correct: { type: "string" },
        wrong1: { type: "string" },
        wrong2: { type: "string" },
      },
    };
  }

}

module.exports = Question;