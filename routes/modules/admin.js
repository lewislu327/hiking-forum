const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/adminController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.delete('/mountains/:id', adminController.deleteMountain)
router.put('/mountains/:id', upload.single('image'), adminController.putMountain)
router.get('/mountains/create', adminController.createMountain)
router.get('/mountains/:id', adminController.getMountain)
router.get('/mountains/:id/edit', adminController.editMountain)
router.post('/mountains', upload.single('image'), adminController.postMountain)
router.get('/mountains', adminController.getMountains)

module.exports = router
