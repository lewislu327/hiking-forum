const express = require('express')
const router = express.Router()
const mountainController = require('../../controllers/mountainController')

router.get('/', mountainController.getMountains)
router.get('/feeds', mountainController.getFeeds)
router.get('/top', mountainController.getTopMountains)
router.get('/:id', mountainController.getMountain)

module.exports = router
