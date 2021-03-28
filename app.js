import express from "express";
import Robot from "./models/robot.js";

const app = express();

//Show All Robots
app.get("/robots", async function (req, res) {
  try {
    const result = await Robot.find({});
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

export default app;
