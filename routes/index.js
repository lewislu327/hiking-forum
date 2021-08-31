const express = require('express')
const router = express.Router()
const mountainRoute = require('./modules/mountain')
const adminRoute = require('./modules/admin')
const userRoute = require('./modules/user')
const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/users/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.redirect('/')
  }
  res.redirect('/users/signin')
}

router.use('/admin', authenticatedAdmin, adminRoute)
router.use('/users', userRoute)
router.use('/', authenticated, mountainRoute)

module.exports = router
