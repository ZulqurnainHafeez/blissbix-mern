const { MongoClient } = require("mongodb");
require("dotenv").config();

async function test() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("✅ Connected successfully");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

test();