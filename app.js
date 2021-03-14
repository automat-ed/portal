const express = require("express");
const robot = require("./models/robot");
const robotDetails = require("./models/robotDetails");

const path = require('path');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Show All Robots
app.get('/robots', async function (req, res) {
    try {
        const result = await robot.find({});
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//Show All Robot Details
app.get('/robot_details', async function (req, res) {
    try {
        const result = await robotDetails.find({});
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

const { auth } = require('./middleware/auth')
const { LoginUser, LogoutUser, getUserDetails, getFirstPage, getAlli } = require('./controller/AuthController');

app.post('/login',LoginUser);
app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname,'./public/login.html'))
});

app.get('/auth',auth, getUserDetails);

app.get('/index',auth, getAlli);

app.get('/logout', auth, LogoutUser);

app.get('/', getFirstPage);

app.use(
    express.static("build", {
        fallthrough: false,
    })
);

module.exports = app;
