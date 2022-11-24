const {Themes} = require('../models/models')
const ApiError = require('../error/ApiError')
class ThemesController{
    async create(req,res){
        const {name} = req.body
        const theme = await Themes.create({name})
        return res.json(theme)
    }
    async getAll(req,res) {
        const themes = await Themes.findAll()
        return res.json(themes)
    }
}
module.exports = new ThemesController()