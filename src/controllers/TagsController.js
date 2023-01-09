const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TagsControllers{
  async index(req, res){
    
    const user_id = req.user.id
    
    const tags = await knex('tags')
      .where({user_id})
      .groupBy('name')
      .orderBy('name')

    res.json(tags)
  }


}

module.exports = TagsControllers