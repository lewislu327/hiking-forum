const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')
const adminRoute = require('./modules/admin')

router.use('/admin', adminRoute)
router.use('/', homeRoute)

module.exports = router
