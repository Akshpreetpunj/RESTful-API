/* "StAuth10222: I Akshpreet Singh Punj, 000820040 certify that this material is my original work. 
  No other person's work has been used without due acknowledgement. 
  I have not made my work available to anyone else." 
*/

const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const app = express();

// use JSON middleware to parse request bodies and put result into req.body
app.use(express.json());

// creates the database and table of data to be managed, then starts the server
async function startup()
{
  // create the database connection
  db = await sqlite.open({
    filename: 'api.db',
    driver: sqlite3.Database
  });
  
  // create a new movies table

  // await db.run("DROP TABLE IF EXISTS movies");
  await db.run("CREATE TABLE IF NOT EXISTS movies (title TEXT, release_year TEXT, time_viewed TEXT)");

  // deleting all the previous entries in the table at the start of the application
  await db.run("DELETE FROM movies");
}

startup();

// start the server
app.listen(3000, function(){
    console.log("RESTful API listening on port 3000!")
});

// http methods for the Collection 
// GET request to the /api to get the entire collection, send it back as JSON data
app.get("/api", async function(req, res)
{
  // acknowledge request received on the console for debugging
  console.log("GET COLLECTION REQUEST RECEIVED");
  
  // get the data to be sent back
  const data = await db.all("SELECT rowid as id, title, release_year, time_viewed FROM movies", function(err) {
    res.send(err.message);
  });
  
  // output data to console for debugging
  // console.log(JSON.stringify(data));

  // send back table data as JSON data
  res.json(data);
});

// PUT request to /api to replace the current collection with the new collection, server will send a response message
app.put("/api", async function(req, res)
{
  // acknowledge request received on the console for debugging
  console.log("PUT COLLECTION REQUEST RECEIVED");

  // Deleting the previous movies collection
  await db.run("DELETE FROM movies");

  // Inserting the new data 
  var stmt = await db.prepare("INSERT INTO movies VALUES(?,?,?)", function(err) {
    return res.send(err.message);
  });

  req.body.forEach(async data => {
    await stmt.run(data.title, data.release_year, data.time_viewed);
  });

  await stmt.finalize();

  // Sending the response message
  return res.send("REPLACE COLLECTION SUCCESSFUL");
});

// POST request to the /api will add new items in the collection, server will send a response message
app.post('/api', async function(req, res)
{
  // acknowledge request received on the console for debugging
  console.log("POST COLLECTION REQUEST RECEIVED");

  // Adding the new item in the current collection
  await db.all("INSERT INTO movies VALUES (?,?,?)", [req.body.title, req.body.release_year, req.body.time_viewed], function(err) {
    return res.send(err.message);
  });

  // Sending the response message
  return res.send("CREATE ENTRY SUCCESSFUL");
});

// DELETE request to the /api will delete the entire collection, server will send a response message
app.delete('/api', async function(req, res)
{
  // acknowledge request received on the console for debugging
  console.log("DELETE COLLECTION REQUEST RECEIVED");

  // Deleting the entire collection
  await db.run("DELETE FROM movies", function(err) {
    return res.send(err.message);
  });

  // Sending the response message
  return res.send("DELETE COLLECTION SUCCESSFUL");
});

// http methods for the Items
// GET request to the /api/id to get the specific item in the collection, send it back as JSON data
app.get("/api/:id", async function(req, res)
{ 
  // acknowledge request received on the console for debugging
  console.log("GET ITEM REQUEST RECEIVED");

  // get the data to be sent back 
  const data = await db.all("SELECT rowid as id, title, release_year, time_viewed FROM movies WHERE rowid = ?", [req.params.id],
                              function(err) {
                                res.send(err.message);
                              });

  // send back table data as JSON data
  res.json(data);
});

// PUT request to the /api/id will update the values for the specific item, server will send a response message
app.put("/api/:id", async function(req, res)
{ 
  // acknowledge request received on the console for debugging
  console.log("PUT ITEM REQUEST RECEIVED");

  // Getting the data from the request body
  let data = req.body;

  // Updating the values of the specific item in the current collection
  await db.run("UPDATE movies SET title=?, release_year=?, time_viewed=? WHERE rowid = ?", [data.title, data.release_year, data.time_viewed, req.params.id], 
                function(err) {
                  return res.send(err.message);
                });

  // Sending the response message
  return res.send("UPDATE ITEM SUCCESSFUL");
});

// DELETE request to the /api/id will delete the specific item from the collection, server will send a response message
app.delete("/api/:id", async function(req, res)
{ 
  // acknowledge request received on the console for debugging
  console.log("DELETE ITEM REQUEST RECEIVED");

  // Deleting the item from the collection
  await db.run("DELETE FROM movies WHERE rowid = ?", [req.params.id], function(err) {
    return res.send(err.message);
  });

  // Sending the response message
  return res.send("DELETE ITEM SUCCESSFUL");
});