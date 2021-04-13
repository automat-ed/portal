import express from "express";
import Robot from "./models/robot.js";
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Notif from "./models/notifications.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const __dirname = path.resolve();

import { auth } from './middleware/auth.js';
import { LoginUser, LogoutUser, getUserDetails, RegisterRob, getFirstPage, updateNotif} from './controller/AuthController.js';

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

app.get('/index', auth, function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/addrob', auth, function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'addRobot.html'));
});

app.get('/data', auth, function(req,res){
	const docs =  Notif.find({'read': false}, function(err, docs) {
		res.send(docs)
	})
})

app.post('/updateNotif', updateNotif)

app.post('/addrob', auth, RegisterRob);
app.get('/logout', auth, LogoutUser);

app.get('/', getFirstPage);

app.use(
  express.static("build", {
    fallthrough: false,
  })
);

export default app;
