const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const passport = require('passport')

router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/', userController.signInPage)
router.get('/signin', userController.signInPage)
router.post(
  '/signin',
  passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
  userController.signIn
)
router.get('/logout', userController.logout)

module.exports = router
