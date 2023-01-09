const { hash } = require("bcrypt");

exports.seed = async knex =>  {
await knex('users').del()
await knex('users').insert([
        {name: 'Erik', email: 'erik@email.com', password: await hash('123', 8), isAdmin: Boolean(1)},
        {name: 'Filipe', email: 'filipe@email.com', password: await hash('123', 8), isAdmin: Boolean(0)},
        {name: 'Vinnie', email: 'vinnie@email.com', password: await hash('123', 8), isAdmin: Boolean(0)}
      ]);
    };
;