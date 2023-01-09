const { Router } = require('express')

const TagsControllers = require('../controllers/TagsController')
const ensureAuth = require('../middleware/ensureAuth')

const tagsControllers = new TagsControllers()

const tagsRoutes = Router()


tagsRoutes.get('/', ensureAuth, tagsControllers.index)


module.exports = tagsRoutes