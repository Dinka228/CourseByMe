const Router = require('express')
const router=new Router()
const themesController = require('../controllers/themesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', themesController.create)
router.get('/', themesController.getAll)

module.exports = router