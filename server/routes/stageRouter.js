const Router = require('express')
const router=new Router()
const stageController = require('../controllers/stageController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',stageController.create)
router.get('/:courseId',stageController.getAll)

module.exports = router