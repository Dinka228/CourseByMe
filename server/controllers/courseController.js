
const {Course} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
const {Sertify} = require("../models/models");
const {Op} = require("sequelize");
const {Progress} = require("../models/models");
// Створення
class CourseController{
    async create(req,res,next){
        try{
            const {name,themesId,cost,description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname,'..','static',fileName))

            const course = await Course.create({name,themesId,cost,description,img:fileName})

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
    async addUserCourse(req,res){
        const {userId,courseId} = req.params
        const progress = 0
        const userCourse = await Progress.create({progress,userId,courseId})

        return res.json(userCourse)
    }
    async getUserCourse(req,res){
        const {userId,courseId} = req.params
        const userCourse = await Progress.findOne({
            where:{[Op.and]:[{userId:userId},{courseId:courseId}]}
        })
        return res.json(userCourse)
    }
    async addUserCertificate(req,res){
        const {userId,courseId} = req.params
        const userSertify = await Sertify.create({userId,courseId})

        return res.json(userSertify)
    }
    async getUserCertificate(req,res){
        const {userId} = req.params
        const userSertify = await Sertify.findAll({where:{userId:userId}})

        return res.json(userSertify)
    }
}
module.exports = new CourseController()