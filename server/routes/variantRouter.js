const Router = require('express')
const router=new Router()
const variantController = require('../controllers/variantController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',variantController.create)
router.get('/:stageId',variantController.getAll)
router.post('/:id/:userId/:courseId',variantController.checkCorrect)

module.exports = router