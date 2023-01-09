exports.up = knex => knex.schema.createTable("users", table => {
  table.increments('id')
  table.string('name', 255).notNullable();
  table.string('email', 255).notNullable();
  table.string('password', 255).notNullable();
  table.string('avatar', 255).nullable()
  table.boolean('isAdmin').notNullable().defaultTo(false)
  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('updated_at').default(knex.fn.now())
})
;


exports.down = knex => knex.schema.dropTable('users');
