const { verify } = require('jsonwebtoken')
const authConfig = require('../config/auth')
const AppError = require('../utils/AppError')

function ensureAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if(!authHeader) throw new AppError('Token inválido', 401)

  try {
    
    const [, token] = authHeader.split(' ')

    const {sub: user_id} = verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id)
    }

    return next()

  } catch (error) {
    // console.log(error)
    throw new AppError('Token inválido', 401)
  }
}

module.exports = ensureAuth