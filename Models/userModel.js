//import mongoose; to use model we need mongoose
const mongoose = require('mongoose')

//schema; to build structure we need schema
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    github: {
        type:String
    },
    linkedin: {
        type:String
    },
    profile: {
        type:String
    },
})


//model-name and collection name should be same
const users = mongoose.model("users",userSchema)

//exporting since it should be used in usercontroller.js
module.exports = users