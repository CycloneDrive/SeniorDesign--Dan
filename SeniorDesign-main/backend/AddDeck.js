const res = require('express/lib/response');
const { request } = require('http');
const https = require('https');
var toBeAdded;
// Sample URL
const url = 'api.fabdb.net';
  
var findCard = function () 
{
    console.log("Beginning the attempt");
    executeHTTPS(function (err, data)
    {
        if(err)
        {
            console.log("An error was encoundered");
        }
        else
        {
            console.log("Success");
        }
    });
}

var executeHTTPS = function(callback)
{
    var options = {
        hostname: url,
        path: "/decks/WKJExRNO",
        method:'GET'
    };
    var req = https.request (options, function(res){
        console.log("Status for API call: " + res.statusCode);
        console.log("Headers for API call: " + JSON.stringify(res.headers));
        res.setEncoding('utf8');

        var body = '';
        res.on('data', function(chunk){
            body = body + chunk;
        });

        res.on('end', function()
        {
            console.log("Body for API call: " + body.length);
            if(res.statusCode != 200)
            {
                console.log("API call failed with response code " + res.statusCode);
                callback("API call failed with reponse code " + res.statusCode, null)
            } else
            {
                console.log("Got response: " + body);
                callback(null, body);
                toBeAdded = body;
            }
        });
    });
    req.on('error', function(e){
        console.log("Problem with API call: " + e.message);
        callback(e, null);
    });
    req.end(); 
}

var excecuteRequest = function(callback)
{
    var headers = {}
    headers['Content-type'] = 'text/html'
    request({
        url: url,
        path : "/decks/WKJExRNO",
        method: "GET",
        headers: headers
    }, function (err, response, body){
        if(err){
            console.error('API failed: ', err)
            callback(err)
        } else{
            console.log("Statuscode: " + response.statusCode);
            console.log("Got response: " + body);
            callback(null, body);
        }
    })
}
findCard();
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const dburl = "mongodb+srv://SolidPixel:VHaLQYftH2E0BYAk@fab.qaz3o.mongodb.net/FaB?retryWrites=true&w=majority"
const client = new MongoClient(dburl);
 
 // The database to use
 const dbName = "Decklist";         
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "Cards"
         const col = db.collection("Decklist");

         // Construct a document                                                                                                                                                              
         let personDocument = JSON.parse(toBeAdded)

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.find().toArray()
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);