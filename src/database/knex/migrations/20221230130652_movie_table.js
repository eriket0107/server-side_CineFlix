exports.up = knex => knex.schema.createTable("movies", table => {
  table.increments('id').primary();
  table.string('title').notNullable();
  table.text('description')
  table.integer('stars').unsigned().notNullable();
  table.string('cover', 255).defaultTo(null)
  table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')

  table.timestamp('created_at').default(knex.fn.now())
})
;


exports.down = knex => knex.schema.dropTable('movies');
