/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable("movies", table =>{
      table.bigIncrements('id')
      table.string('imbdId').notNullable()
      table.string('title').notNullable()
      table.integer('year').notNullable()
      table.text('description').notNullable()
      table.string('photoUrl')
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
* @param {Knex} knex
*/
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("movies")
}
