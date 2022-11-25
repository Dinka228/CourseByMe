const {Course} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
// Створення
class CourseController{
    async create(req,res,next){
        try{
            const {name,themes,cost,description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname,'..','static',fileName))

            const course = await Course.create({name,themes,cost,description,img:fileName})

            return res.json(course)

        }catch(e){
            next(ApiError.badRequest(e.message))
        }

    }
    // Отримання всіх
    async getAll(req,res) {
        let {themes,page,limit} = req.query
        page = page||1
        limit = limit||9
        let offset = page*limit - limit
        let courses
        if(!themes){
            courses = await Course.findAndCountAll({limit,offset})
        }if(themes){
            courses = await Course.findAndCountAll({where:{themes},limit,offset})
        }
        return res.json(courses)

    }
    //Отримання одного
    async getOne(req,res){
        const {id} = req.params
        const course = await Course.findOne({
            where:{id}
        })
        return res.json(course)
    }
}
module.exports = new CourseController()