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
        const {id} = req.params
        const variant = await Variant.findOne({where:{id}})
        const taskId = variant.taskId
        if(variant.correct === "Yes"){
            await Task.update({
                correct:"Yes"
            },{
                where:{id: variant.taskId}
            })
            const taskStatus = await Task.findOne({where:{id:taskId}})
             res.json(taskStatus)
        }else{
            await Task.update({
                correct:"No"
            },{
                where:{id: variant.taskId}
            })
            const taskStatus = await Task.findOne({where:{id:taskId}})
            res.json(taskStatus)
        }

    }
}
module.exports = new VariantController()