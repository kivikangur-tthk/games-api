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
const User = require("./models/userModel")
const bodyParser = require("body-parser")


const seedMongoDB = require("./seedData")
seedMongoDB().then(()=>{
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGODB_URI)
    app.use(cors())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())

    require("./routes/gameRoutes")(app)
    require("./routes/authRoutes")(app)

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    // Handling errors
    app.use((err,req,res,next)=>{
        console.log(err);
        res.status(400).send({error:err.message})
        //next(err)
    })

    app.listen(port, () => {
        console.log(`API up at: http://localhost:${port}`);
    })    
});

