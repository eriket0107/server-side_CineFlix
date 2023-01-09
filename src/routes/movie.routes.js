const multer = require('multer')
const {Router} = require('express')
const uploadConfig = require('../config/upload')
const ensureAuth = require('../middleware/ensureAuth')
const MovieController = require('../controllers/MoviesController')
const MovieCoverController = require('../controllers/MoviesCoverController')

const movieController = new MovieController()
const movieCoverController = new MovieCoverController()

const movieRoutes = Router()
const upload = multer(uploadConfig.MULTER)

movieRoutes.use(ensureAuth)

movieRoutes.post('/', movieController.create)
movieRoutes.get('/', movieController.index)
movieRoutes.get('/:id', movieController.show)
movieRoutes.delete('/:id', movieController.delete)
movieRoutes.patch('/:id/cover', upload.single("cover"), movieCoverController.update)


module.exports = movieRoutes