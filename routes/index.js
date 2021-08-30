const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')
const adminRoute = require('./modules/admin')
const userRoute = require('./modules/user')

router.use('/admin', adminRoute)
router.use('/users', userRoute)
router.use('/', homeRoute)

module.exports = router
