const { Router } = require('express')
const routes = Router()

const userRoutes = require('./user.routes')
const tagsRoutes = require('./tags.routes')
const movieRoutes = require('./movie.routes')
const sessionRoutes = require('./session.routes')

routes.use('/tags', tagsRoutes)
routes.use('/users', userRoutes)
routes.use('/movies', movieRoutes)
routes.use('/session', sessionRoutes)

module.exports = routes