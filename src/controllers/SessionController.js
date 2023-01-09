const {compare} = require('bcrypt')
const knex = require('../database/knex')
const { sign } = require('jsonwebtoken')
const authConfig = require('../config/auth')
const AppError = require("../utils/AppError");


class SessionController {
  async create(req, res){
    const {email, password} = req.body

    const user = await knex('users').where({email}).first()

    if(!user){
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const matchedPassword = await compare(password, user.password)

    if(!matchedPassword){
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const {expiresIn, secret} = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    
    return res.json({user, token})
  }
}

module.exports = SessionController