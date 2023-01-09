const multer = require('multer')
const { Router } = require('express')
const uploadConfig = require('../config/upload'
)
const ensureAuth = require('../middleware/ensureAuth')

const UserController = require('../controllers/UserControllers')
const UserAvatarController = require('../controllers/UserAvatarController')

const userController = new UserController()
const userAvatarController = new UserAvatarController()

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER);
 
userRoutes.post('/', userController.create)                                  
userRoutes.get('/', ensureAuth, userController.show)                                  
userRoutes.put('/', ensureAuth, userController.updated)
userRoutes.patch('/avatar', ensureAuth, upload.single('avatar'), userAvatarController.update)


module.exports = userRoutes