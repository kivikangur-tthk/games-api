const app = require("express")()
const port = 8080
const swaggerUi = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
//const swaggerDocument = require("./docs/swagger.json")


const games = [
    { id: 1, name: "Witcher 3", price: 29.99 },
    { id: 2, name: "Cyberpunk 2077", price: 59.99 },
    { id: 3, name: "Minecraft", price: 29.99 },
    { id: 4, name: "Roblox", price: 0 },
    { id: NaN, name: "Roblox", price: 0 },
]

app.get("/games", (req, res) => {
    res.send(games)
})

app.get("/games/:id", (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer." })
        return
    }
    let result = games.find(x => x.id === parseInt(req.params.id))
    
    if(typeof(result)==="undefined"){
        res.status(404).send({error:"Game not found."})
        return
    }

    res.send(result)
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})