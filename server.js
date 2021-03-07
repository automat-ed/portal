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
const uri = "mongodb+srv://portal-website:dBo9uSE3VL7yLu@portalwebsite.sjxh6.mongodb.net/streetsmart?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) throw err;
});
//

//Show All Robots
app.get('/showallrobots', function(req, res) {
    var dbo = client.db("streetsmart");
    dbo.collection("robots").find({}).toArray(function(err, result) {
        res.send(result);
    });
  

})

//Show All Robot Details
app.get('/showallrobotdetails', function(req, res) {
    var dbo = client.db("streetsmart");
    dbo.collection("robotdetails").find({}).toArray(function(err, result) {
        res.send(result);
    });

})

app.get('/showallrobots', function(req, res) {
    dbo.collection("robots").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
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
