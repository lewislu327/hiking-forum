const express = require('express')
const router = express.Router()
const mountainController = require('../../controllers/mountainController')

router.get('/', mountainController.getMountains)
router.get('/mountains/:id', mountainController.getMountain)

module.exports = router
