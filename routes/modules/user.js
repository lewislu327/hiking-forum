const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const passport = require('passport')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/signin', userController.signInPage)
router.post(
  '/signin',
  passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
  userController.signIn
)
router.get('/logout', userController.logout)
router.get('/:id/edit', userController.editUser)
router.put('/:id', upload.single('image'), userController.putUser)
router.get('/:id', userController.getUser)
module.exports = router
