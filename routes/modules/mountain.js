const express = require('express')
const router = express.Router()
const mountainController = require('../../controllers/mountainController')

router.get('/mountains/:id', mountainController.getMountain)
router.get('/mountains', mountainController.getMountains)

module.exports = router
