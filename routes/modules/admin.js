const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')

router.delete('/mountains/:id', adminController.deleteMountain)
router.put('/mountains/:id', adminController.putMountain)
router.get('/mountains/create', adminController.createMountain)
router.get('/mountains/:id', adminController.getMountain)
router.get('/mountains/:id/edit', adminController.editMountain)
router.post('/mountains', adminController.postMountain)
router.get('/mountains', adminController.getMountains)

module.exports = router
