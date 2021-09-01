const express = require('express')
const router = express.Router()
const mountainRoute = require('./modules/mountain')
const adminRoute = require('./modules/admin')
const userRoute = require('./modules/user')
const authRoute = require('./modules/auth')
const commentRoute = require('./modules/comment')

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error_messages', '請您先進行登入')
  return res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.redirect('/mountains')
  }
  res.redirect('/signin')
}

router.use('/admin', authenticatedAdmin, adminRoute)
router.use('/comments', authenticated, commentRoute)
router.use('/users', authenticated, userRoute)
router.use('/mountains', authenticated, mountainRoute)
router.use('/', authRoute)

module.exports = router
