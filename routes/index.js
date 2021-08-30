const express = require('express')
const router = express.Router()
const homeRoute = require('./modules/home')

router.use('/', homeRoute)

module.exports = router
