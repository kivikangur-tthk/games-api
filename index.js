const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
//const swaggerDocument = require("./docs/swagger.json")
const mongoose = require("mongoose")
const Game = require("./models/gameModel")
const bodyParser = require("body-parser")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/gamesApiDb")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require("./routes/gameRoutes")(app)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})