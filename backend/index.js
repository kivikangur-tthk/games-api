require("dotenv").config()
const app = require("express")()
const cors = require("cors")
const port = process.env.PORT
const swaggerUi = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
//const swaggerDocument = require("./docs/swagger.json")
const mongoose = require("mongoose")
const Game = require("./models/gameModel")
const bodyParser = require("body-parser")


const seedMongoDB = require("./seedData")
seedMongoDB().then(()=>{
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGODB_URI)
    app.use(cors())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    require("./routes/gameRoutes")(app)

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    app.listen(port, () => {
        console.log(`API up at: http://localhost:${port}`);
    })    
});

