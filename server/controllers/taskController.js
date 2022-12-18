const {CompleteTask} = require("../models/models");
const {Task} = require("../models/models");

class TaskController{
    async create(req,res){
        const {text,progress,stageId,completeAnswer,answerCount} = req.body
        const task = await Task.create({text,progress,stageId,completeAnswer,answerCount})

        return res.json(task)
    }
    async getAll(req,res){
        const {stageId} = req.params
        const task = await Task.findAll({
            where:{stageId}
        })
        return res.json(task)
    }
    async getCompleteTask(req,res){
        const {userId} = req.params
        const task = await CompleteTask.findAll({
            where:{userId:userId}
        })
        return res.json(task)
    }
}
module.exports = new TaskController()