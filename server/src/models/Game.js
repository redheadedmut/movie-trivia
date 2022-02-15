const Model = require("./Model.js")

class Game extends Model {
  static get tableName() {
    return "games";
  }

  static get relationMappings(){
    const User = require("./User.js")

    return{
      users:{
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "games.userId",
          to: "users.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["score", "isOver"],

      properties: {
        score: { type: "integer"},
        isOver: { type: "boolean" },
      },
    };
  }

}

module.exports = Game;
