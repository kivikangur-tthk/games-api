const { faker } = require("@faker-js/faker")

function toTitleCase(str) {
    return str.toLowerCase()
        .split(' ')
        .map((word) => (word.charAt(0).toUpperCase() + word.slice(1)))
        .join(' ');
}

const games = [
    { id: 1, name: "Witcher 3", price: 29.99 },
    { id: 2, name: "Cyberpunk 2077", price: 59.99 },
    { id: 3, name: "Minecraft", price: 29.99 },
    { id: 4, name: "Roblox", price: 0 },
    { id: 5, name: "Roblox", price: 0 },
]

for (let i = 0; i < 20; i++) {
    //const randomName = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`
    games.push(
        {
            id: 6 + i,
            name: toTitleCase(faker.random.words()),
            price: Number(faker.finance.amount(0,100))
        }
    )
}

exports.getAll = (req, res) => {
    res.send(games)
}

exports.createNew = (req, res) => {
    const length = games.push(req.body)
    games[length - 1] = { id: games[length - 2].id + 1, ...games[length - 1] }
    res.status(201).json(games[length - 1])
} // Create     

exports.getById = (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer." })
        return
    }

    let result = games.find(x => x.id === parseInt(req.params.id))

    if (typeof (result) === "undefined") {
        res.status(404).send({ error: "Game not found." })
        return
    }
    res.send(result)
} // Read

exports.editById = (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer." })
        return
    }
    const index = games.findIndex(x => x.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send({ error: "Game not found." })
        return
    }
    games[index] = { ...games[index], ...req.body }
    res.status(200).json(games[index])
} // Update  

exports.deleteById = (req, res) => {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer." })
        return
    }

    const index = games.findIndex(x => x.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send({ error: "Game not found." })
        return
    }
    games.splice(index, 1)
    res.status(204).send()
} // Delete