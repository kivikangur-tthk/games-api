const auth = require("../controllers/AuthController")

module.exports = (app) => {
    app.route("/login").post(auth.loginUser)    
    app.route("/register").post(auth.registerUser)
}