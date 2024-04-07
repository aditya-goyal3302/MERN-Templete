const mongoose = require('mongoose')
const { Schema } = mongoose

const acl_model = new Schema({
    title:{
        type:String,
        unique:true
    },
    access:{
        type:Array,
        default:[Number]
    }
})

module.exports = mongoose.model('acl',acl_model)