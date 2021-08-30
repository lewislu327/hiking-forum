const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')

router.get('/', adminController.getMountains)
router.get('/mountain/create', adminController.createMountain)
router.post('/mountains', adminController.postMountain)

module.exports = router
