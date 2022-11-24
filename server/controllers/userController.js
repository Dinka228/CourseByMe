const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User}=require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt=(id,email,role,fullName,name,telephone)=>{
    return jwt.sign(
        {id,email,role,fullName,name,telephone},
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }

    )
}

class UserController{
    async registration(req,res,next){
        const {email,password,role,fullName,name,telephone} = req.body
        if(!email||!password){
            return next(ApiError.badRequest('Невірно вказана пошта або пароль'))
        }
        const candidate = await User.findOne({
            where:{email}
        })
        if(candidate){
            return next(ApiError.badRequest('Користувач з такою поштою вже є'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,role,password:hashPassword,fullName,name,telephone})
        const token = generateJwt(user.id,user.email,user.role,user.fullName,user.name,user.telephone)
        return res.json({token})
    }
    async login(req,res,next){
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('Користувача не існує'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.internal('Невірний пароль'))
        }
        const token = generateJwt(user.id,user.email,user.role,user.fullName,user.name,user.telephone)
        return res.json({token})
    }
    async check(req,res,next) {
        const token = generateJwt(req.user.id,req.user.email,req.user.role,req.user.fullName,req.user.name,req.user.telephone)
        return res.json({token})
    }
}
module.exports = new UserController()