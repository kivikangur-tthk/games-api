const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type:String,
        required: "Name is mandatory"
    },
    email:{
        type:String,
        unique:true,
        required: "E-mail is mandatory"
    },
    password:{
        type:String,
        required: "Password is mandatory"
    }
})
module.exports = mongoose.model("User",UserSchema)