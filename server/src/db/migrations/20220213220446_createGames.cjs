/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable("games", table =>{
      table.bigIncrements('id')
      table.integer("score").notNullable()
      table.boolean("isOver").notNullable()
      table.bigInteger('userId')
        .notNullable()
        .unsigned()
        .index()
        .references('users.id')
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
* @param {Knex} knex
*/
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("games")
}
