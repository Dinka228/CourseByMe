const Router = require('express')
const router=new Router()
const courseRouter = require('./courseRouter')
const stageRouter = require('./stageRouter')
const taskRouter = require('./taskRouter')
const variantRouter = require('./variantRouter')
const userRouter = require('./userRouter')
const themesRouter = require('./themesRouter')


router.use('/user',userRouter)
router.use('/course',courseRouter)
router.use('/stage',stageRouter)
router.use('/task',taskRouter)
router.use('/variant',variantRouter)
router.use('/themes',themesRouter)

module.exports = router