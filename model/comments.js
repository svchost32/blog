var mongoose = require ('mongoose')

mongoose.connect('mongodb://localhost/test',{useUnifiedTopology: true})

var Schema = mongoose.Schema

var commentSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
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
    comments:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        enum:[0,1,2,3,4],
        default:0
    }
})

module.exports = mongoose.model('Comment',commentSchema)