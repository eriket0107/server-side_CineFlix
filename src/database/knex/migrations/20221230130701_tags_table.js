exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments('id').primary();
  table.string('name')
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
  table.integer('movie_id').references('id').inTable('movies').onDelete('CASCADE')
})
;


exports.down = knex => knex.schema.dropTable('tags');
