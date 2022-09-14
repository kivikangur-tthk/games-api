const mongoose = require("mongoose")
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
    console.log(req.body);
    const new_game = new Game(req.body)
    new_game.save((err,game)=>{
        if(err){
            res.status(400).send(err)
        } else {
            res.status(201).json(game)
        }
    })
} // Create     

exports.getById = (req, res) => {

} // Read

exports.editById = (req, res) => {

} // Update  
      
exports.deleteById = (req, res) => {

} // Delete