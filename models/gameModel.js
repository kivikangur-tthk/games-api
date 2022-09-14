const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GameSchema = new Schema({
    
    name:{
        type:String,
        required: "Game name is mandatory"
    },
    price:{
        type:Number,
        required: "Price is mandatory"
    }
})

module.exports = mongoose.model("Game",GameSchema)