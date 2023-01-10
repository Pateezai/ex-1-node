const express = require('express');
const app = express();

const randomstring = require('randomstring');

const MongoClient = require('mongodb').MongoClient;
const MONGO_DB = "mongodb+srv://admin:admin@cluster0.cfjrqh5.mongodb.net/?retryWrites=true&w=majority"
//create new mongoclient for mongodb atlas




var database;

//function for database connection 
async function dbconnection() {
  try {

    const client = new MongoClient(MONGO_DB);

    // Connect the client to the server
    await client.connect();
    //define role 
    database = client.db("url_db");
    //log for check connection
    console.log("Connected successfully to server");
    // return urldb;
    } catch {
        //raise error if error
        console.error(error);
    }
//   finally {
//     console.log('close now')
//     // close client (make sure) when you finish/error
//     await client.close();
//   }
}
dbconnection().catch(console.dir);


// function is_custom_null (){
//     if ( custom_url == null ){
//             var custom_url = randomstring.generate(8);
//         return custom_url
//     } 
//     return custom_url
// }


// app.post('/', async (req,res) => {
    
//     const custom_url_post = is_custom_null();
//     console.log(custom_url_post)
//     // const url_collect = { og_url, custom_url_post, generate_short_url }
// })

// app.post('/d', async (req,res) => {
//     const url = req.body;
//     const genShort = randomstring.generate(6);
//     const obj = { url, genShort};
//     await database.collection('urls').insertOne(obj);
//     res.send(obj);
// })

//check data in collections
app.get('/api/urldb', (req, res) => {
    database.collection('urls').find({}).toArray((err, client) => {
        if(err) throw err
        res.send(client);
    })
})

app.listen(8000, () => {
    console.log('Server started on port 8000');
});