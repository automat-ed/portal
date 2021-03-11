const express = require("express");
const robot = require("./models/robot");
const robotDetails = require("./models/robotDetails");

const app = express();

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

app.use(
    express.static("build", {
        fallthrough: false,
    })
);

module.exports = app;
