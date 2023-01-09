const knexJS = require('../../knex')
exports.seed = async function(knex) {
  
  const user = await knexJS('users').where({email: "erik@email.com"}).first()

  const movie1 = await knexJS('movies').where({title: "Senhor dos Anéis: a sociedade do anel"})
  const movie2 = await knexJS('movies').where({title: "Senhor dos Anéis: as duas torres"})
  const movie3 = await knexJS('movies').where({title: "Senhor dos Anéis: o retorno do rei"})

  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Senhor dos Anéis: a sociedade do anel', description: ' senhor dos aneis 1', stars: '4', user_id: user.id },
    {title: 'Senhor dos Anéis: as duas torres', description: ' senhor dos aneis 2', stars: '4', user_id:  user.id },
    {title: 'Senhor dos Anéis: o retorno do rei', description: ' senhor dos aneis 3', stars: '5', user_id: user.id },
  ]);

  await knex('tags').insert([
    {name: 'Fantasia', user_id:  user.id, movie_id: movie1.id },
    {name: 'Medieval', user_id:  user.id, movie_id: movie1.id },
    {name: 'Continuação', user_id:  user.id, movie_id: movie2.id },
    {name: 'Medieval', user_id:  user.id, movie_id: movie2.id },
    {name: 'Fantasia', user_id:  user.id, movie_id: movie3.id },
    {name: 'Continuação', user_id:  user.id, movie_id: movie3.id },
  ]);

  await knex('links').insert([
    {url: 'Link1',  movie_id: movie1.id },
    {url: 'Link2',  movie_id: movie1.id },
    {url: 'Link3',  movie_id: movie2.id },
    {url: 'Link4',  movie_id: movie3.id },
  ]);
};
