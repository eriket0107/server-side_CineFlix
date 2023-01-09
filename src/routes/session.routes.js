const SessionController = require('../controllers/SessionController')

const {Router} = require('express')
const ensureAuth = require('../middleware/ensureAuth')



const sessionController = new SessionController()

const sessionRoutes = Router()

sessionRoutes.post('/' ,sessionController.create)

module.exports = sessionRoutes