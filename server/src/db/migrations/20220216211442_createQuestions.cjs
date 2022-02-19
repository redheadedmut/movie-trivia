/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable("questions", table =>{
      table.bigIncrements('id')
      table.string('prompt').notNullable()
      table.string('correct').notNullable()
      table.string('wrong1').notNullable()
      table.string('wrong2').notNullable()
      table.bigInteger('userId')
        .notNullable()
        .unsigned()
        .index()
        .references('users.id')
      table.bigInteger('movieId')
        .notNullable()
        .unsigned()
        .index()
        .references('movies.id')
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
* @param {Knex} knex
*/
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("questions")
}
