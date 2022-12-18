const Router = require('express')
const router=new Router()
const courseController = require('../controllers/courseController')

router.get('/:userId', courseController.getUserCertificate)

module.exports = router