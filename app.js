import express from "express";
import Robot from "./models/robot.js";

const path = require('path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { auth } = require('./middleware/auth')
const { LoginUser, LogoutUser, getUserDetails, getFirstPage, getAlli } = require('./controller/AuthController');

//Show All Robots

app.get("/robots", auth, async function (req, res) {
  try {
    const result = await Robot.find({});
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post('/login',LoginUser);
app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/auth', auth, getUserDetails);

app.get('/index', auth, getAlli);

app.get('/logout', auth, LogoutUser);

app.get('/', getFirstPage);

app.use(
  express.static("build", {
    fallthrough: false,
  })
);

export default app;
