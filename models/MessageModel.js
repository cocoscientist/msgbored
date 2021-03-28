const mongoose = require('mongoose')
const MsgSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Messages",MsgSchema)