const express = require('express')
const router = express.Router()
const mountainController = require('../../controllers/mountainController')

router.get('/mountains', mountainController.getMountains)
router.get('/mountains/feeds', mountainController.getFeeds)
router.get('/mountains/top', mountainController.getTopMountains)
router.get('/mountains/:id', mountainController.getMountain)

module.exports = router
