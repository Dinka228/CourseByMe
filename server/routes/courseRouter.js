const Router = require('express')
const router=new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', courseController.create)
router.get('/', courseController.getAll)
router.get('/:id',courseController.getOne)
router.post('/:userId/:courseId', courseController.addUserCourse)
router.get('/:userId/:courseId', courseController.getUserCourse)
router.post('/getCertificate/:userId/:courseId', courseController.addUserCertificate)
router.get('/get/:userId', courseController.getUserCertificate)

module.exports = router