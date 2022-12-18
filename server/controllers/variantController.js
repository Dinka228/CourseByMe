const {Op} = require("sequelize");
const {Progress} = require("../models/models");
const {CompleteTask} = require("../models/models");
const {Variant,Task} = require("../models/models");

class VariantController{
    async create(req,res){
        const {text,taskId,stageId,correct} = req.body
        const variant = await Variant.create({text,taskId,stageId,correct})

        return res.json(variant)
    }
    async getAll(req,res){
        const {stageId} = req.params
        const variant = await Variant.findAll({
            where:{stageId}
        })
        return res.json(variant)
    }
    async checkCorrect(req,res){
        const {id,userId,courseId} = req.params
        const variant = await Variant.findOne({where:{id}})
        const taskId = variant.taskId
        const taskProgress = await Task.findOne({where:{id:variant.taskId}})
        const checkCompleteTask = await CompleteTask.findOne({where:{[Op.and]:[{userId:userId},{taskId:taskId}]}})
        let updateProgress
        if(variant.correct === 'Yes'){
            if(!checkCompleteTask){
                await CompleteTask.create({userId,taskId})
                const userCourse = await Progress.findOne({
                    where:{[Op.and]:[{userId:userId},{courseId:courseId}]}
                })
                updateProgress = +userCourse.progress + +taskProgress.progress
                await Progress.update({progress:updateProgress},{where:{[Op.and]:[{userId:userId},{courseId:courseId}]}})
                const updatedProgress = await Progress.findOne({
                    where:{[Op.and]:[{userId:userId},{courseId:courseId}]}
                })
                return res.json(updatedProgress)
            }

        }
        else{
            const updatedProgress = await Progress.findOne({
                where:{[Op.and]:[{userId:userId},{courseId:courseId}]}
            })
            return res.json(updatedProgress)
        }

    }
}
module.exports = new VariantController()