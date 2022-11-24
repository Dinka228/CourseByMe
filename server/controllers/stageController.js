const {Stage} = require("../models/models");

class StageController{
    async create(req,res){
        const {name,progress,courseId} = req.body
        const stage = await Stage.create({name,progress,courseId})

        return res.json(stage)
    }
    async getAll(req,res){
        const {courseId} = req.params
        const stage = await Stage.findAll({
            where:{courseId}
        })
        return res.json(stage)
    }
}
module.exports = new StageController()