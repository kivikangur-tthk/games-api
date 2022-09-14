const gamesList = require("../controllers/mockGameController")

module.exports = (app) => {
    app.route("/games")
        .get(gamesList.getAll)
        .post(gamesList.createNew)      // Create
    
    app.route("/games/:id")
        .get(gamesList.getById)         // Read
        .put(gamesList.editById)        // Update        
        .delete(gamesList.deleteById)   // Delete
}