/* mySeedScript.js */

// require the necessary libraries
const { faker } = require("@faker-js/faker")
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedMongoDB() {
    // Connection URL
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });    
    try {
        client.connect().then((client)=>{
        const collection = client.db("gamesApiDb").collection("games");
        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();
        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const name = `${firstName} ${lastName}`;
            let newGame = {
                name:name,
                price:randomIntFromInterval(1,99)
            }
            timeSeriesData.push(newGame);
        }
        collection.insertMany(timeSeriesData).then(()=>{
        setTimeout(() => {client.close().then(()=>{
        })}, 1500)
        console.log("Database seeded! :)");
        });
        
        });
                
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports=seedMongoDB;