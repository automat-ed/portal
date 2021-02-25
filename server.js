const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mysql = require("mysql");
// Initialize modules
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// MongoDB Connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://portal-website:demeaning-never-recent@portalwebsite.sjxh6.mongodb.net/streetsmart?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//

//Show All Robots
app.get('/showallrobots', function(req, res) {

  MongoClient.connect(uri, function(err, db) {
      useNewUrlParser: true
      if (err) throw err;
      var dbo = db.db("streetsmart");
      dbo.collection("robots").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
      });
  });

})

//Show All Robot Details
app.get('/showallrobotdetails', function(req, res) {

  MongoClient.connect(uri, function(err, db) {
      useNewUrlParser: true
      if (err) throw err;
      var dbo = db.db("streetsmart");
      dbo.collection("robotdetails").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
      });
  });

})

app.get('/showallrobots', function(req, res) {

  MongoClient.connect(uri, function(err, db) {
      useNewUrlParser: true
      if (err) throw err;
      var dbo = db.db("streetsmart");
      dbo.collection("robots").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
      });
  });

})

app.use(
  express.static("public", {
    fallthrough: false,
  })
);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(2000, () => {
  console.log(`Example app listening at http://localhost:2000`);
});
