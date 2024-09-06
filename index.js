const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



// https://i.ibb.co.com/6sS9c9r/b1.jpg
// https://i.ibb.co.com/gZqqL8C/b2.jpg
// https://i.ibb.co.com/Lv5gGct/b3.jpg
// https://i.ibb.co.com/V3VpD5r/b4.jpg
// https://i.ibb.co.com/8BBkgWR/b5.webp
// https://i.ibb.co.com/TPnxh11/b6.jpg
// https://i.ibb.co.com/Bs4FxBd/b7.jpg
// https://i.ibb.co.com/FxqQXmz/b8.jpg
// https://i.ibb.co.com/bB7ZPtF/b9.jpg
// https://i.ibb.co.com/0BB8nyk/b10.jpg


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i0wokhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const allBookDB = client.db("bookStoreDB").collection("allBook");

        app.get("/", (req, res) => {
            res.send("Server is running, ok")
        })

        app.get("/books", async (req, res) => {
            const data = await allBookDB.find().toArray();
            res.send(data);
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);





app.listen(port, () => {
    console.log(`the app is running on port ${port}`);
})