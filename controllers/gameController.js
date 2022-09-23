const mongoose = require("mongoose")
const { rawListeners } = require("../models/gameModel")
const Game = mongoose.model("Game")

exports.getAll = (req, res) => {
    Game.find({}, (err, game) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.json(game)
        }
    })
}

exports.createNew = (req, res) => {
    if(!req.body.name || !req.body.price)    {        
        return res.status(400).send({error:"One or all params are missing"})
    }
    const new_game = new Game(req.body)
    new_game.save((err,game)=>{
        if(err){
            res.status(400).send(err)
        } else {
            res.status(201)
                .location(`${getBaseUrl(req)}/games/${game.id}`)
                .json(game)
        }
    })
} // Create     

exports.getById = (req, res) => {
    Game.findById(req.params.id, (err, game) => {
        if (err) {
            res.status(404).send({error:"Game not found"})
        } else {
            res.json(game)
        }
    })
} // Read

exports.editById = (req, res) => {

} // Update  
      
exports.deleteById = (req, res) => {
    Game.findByIdAndDelete(req.params.id,(err,game)=>{
        if(err){
            console.log(err)
            return res.status(404).send({error:"Game not found"})
        } else {
            res.status(204).send()
        }
    })
} // Delete

function getBaseUrl(req) {
    return (req.connection && req.connection.encrypted ? "https":"http")
            +`://${req.headers.host}`
}