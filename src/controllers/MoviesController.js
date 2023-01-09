const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesController {
  async create(req, res){
    const {title, description, tags, stars} = req.body
    const user_id = req.user.id


    const movie_id = await knex('movies').insert({
      title,
      description,
      user_id,
      stars: Number(stars),
    })

    const movieId =  movie_id[0]

    const tagsInsert = tags.map(name =>{
      return {
        movie_id: movieId,
        name,
        user_id
      }
    })

    if(!tagsInsert.length){
      return res.json('Filme cadastrado com sucesso!')
    }
    
    await knex('tags').insert(tagsInsert)
    
   return res.json('Filme cadastrado com sucesso!')
  } 

  async index(req, res){
    const user_id = req.user.id
    const {title, tags} = req.query

    let movies;

    if(tags){
      const filterTags = tags.split(",").map(tag=> tag.trim())

      movies = await knex('tags')
      .select(["movies.id", "movies.title", "movies.user_id"])
      .where("movies.user_id", user_id)
      .whereLike("movies.title", `${title}`)
      .whereIn("name", filterTags)
      .innerJoin("movies", "movies.id", "tags.movie_id")
      .groupBy("movies.id")
      .orderBy("movies.title")

    } else {
      movies = await knex('movies')
        .where({user_id})
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({user_id})
    const moviesWithTags = movies.map(movie =>{
      const movieTags = userTags.filter(tag => tag.movie_id === movie.id)
      return{
        ...movie,
        tags: movieTags
      }
    })

   return res.json(moviesWithTags)
  }

  async show(req, res){
    const { id } = req.params 

    const movie = await knex('movies').where({id}).first()
    const tags = await knex('tags').where({movie_id: id}).orderBy('name')

    if(!movie) throw new AppError('Nenhuma nota cadastrada')
    return res.json({
      ...movie,
      stars: movie.stars,
      tags,
    })
  }

  async delete(req, res){
    const { id } = req.params
    const user_id = req.user.id

    const user= await knex("movies").where({user_id}).first()

    if(user.user_id !== user_id) throw new AppError('Usuário não autenticado')

    await knex("movies").where({id}).delete()

   return  res.json('Nota deletada com sucesso!')
  }
}

module.exports = MoviesController