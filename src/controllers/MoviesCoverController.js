const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')


class MoviesCoverController{
  async update(req, res){
    const { id } = req.params
    const coverFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const movie = await knex("movies").where({id}).first()

    if(!movie) throw new AppError('Somente usuários autenticados podem inserir uma imagem para um filme', 401)
  
    if(movie.cover){
      await diskStorage.deleteFile(movie.cover)
    }

    const filename = await diskStorage.saveFile(coverFilename)
    movie.cover = filename

    await knex("movies").update(movie).where({id})

    return res.json(movie)
  }
}

module.exports = MoviesCoverController