const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING,unique:true},
    fullName:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING},
    password:{type:DataTypes.STRING},
    role:{type:DataTypes.STRING,defaultValue:"USER"},
    telephone:{type:DataTypes.INTEGER,unique: true}
})
const Course = sequelize.define('course',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    themes:{type:DataTypes.STRING},
    name:{type:DataTypes.STRING,allowNull:false},
    cost:{type:DataTypes.INTEGER},
    img:{type:DataTypes.STRING},
    description:{type:DataTypes.STRING}
})
const Stage = sequelize.define('stage',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false},
    progress:{type:DataTypes.INTEGER},
    completeAnswer:{type:DataTypes.INTEGER},
    answerCount:{type:DataTypes.INTEGER}
})
const Task = sequelize.define('task',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    text:{type:DataTypes.STRING,allowNull:false},
    progress:{type:DataTypes.INTEGER},
    correct:{type:DataTypes.STRING}
})
const Variant = sequelize.define('variant',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    text:{type:DataTypes.STRING,allowNull:false},
    stageId:{type:DataTypes.INTEGER},
    correct:{type:DataTypes.STRING}
})
const Themes = sequelize.define('themes',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:DataTypes.STRING,allowNull:false}
})
const Progress = sequelize.define('progress',{
    progress:{type:DataTypes.INTEGER}
})
const Sertify = sequelize.define('sertify',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
})
const TrueVariant = sequelize.define('trueVariant',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true}
})


Course.hasMany(Stage)
Stage.belongsTo(Course)
Stage.hasMany(Task)
Task.belongsTo(Stage)
Task.hasMany(Variant)
Variant.belongsTo(Task)

User.belongsToMany(Course,{through:Progress})
Course.belongsToMany(User,{through:Progress})
User.belongsToMany(Course,{through:Sertify})
Course.belongsToMany(User,{through:Sertify})
Task.belongsToMany(Variant,{through:TrueVariant})
Variant.belongsToMany(Task,{through:TrueVariant})
// Course.belongsToMany(Themes,{through:TrueVariant})
// Themes.belongsToMany(Course,{through:TrueVariant})

module.exports={
    User,
    Course,
    Themes,
    Stage,
    Task,
    Variant,
    Progress,
    Sertify,
    TrueVariant
}