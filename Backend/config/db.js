const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectToDatabase() {
    await client.connect();

    db = client.db("SkillSwap");

    console.log("Connected to MongoDB");
}

function getDb() {
    return db;
}

module.exports = {
    connectToDatabase,
    getDb
};