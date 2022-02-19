const Model = require("./Model.js")

class Movie extends Model {
  static get tableName() {
    return "movies";
  }

  static get relationMappings(){
    const Question = require("./Question.js")

    return{
      users:{
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "movies.id",
          to: "questions.movieId"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["imbdId", "title", "year","description"],

      properties: {
        imbdId: { type: "string"},
        title: { type: "string" },
        year: { type: ["integer", "string"] },
        description: { type: "text" },
        photoUrl: { type: "string" },
      },
    };
  }

}

module.exports = Movie;
