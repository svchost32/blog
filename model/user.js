var mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost/test',{useUnifiedTopology: true})

var Schema = mongoose.Schema

var userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    create_time:{
        type:Date,
        default:Date.now//方法名，调用自动生成
    },
    last_modify:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:'/public/img/avatar-default.jpg'
    },
    self_desc:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    birthday:{
        type:Date,
    },
    status:{
        type:Number,
        enum:[0,1,2,3,4],
        default:0
    }
})

module.exports = mongoose.model('User',userSchema)