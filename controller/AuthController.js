import path from 'path';
import User from '../models/users.js';
import Robot from "../models/robot.js";
import Notif from "../models/notifications.js";
export const RegisterUser = async (req, res) => {
	const user = new User(req.body);
	await user.save((err, doc) => {
		if (err) {
		return res.status(422).json({errors:err})
		} else {
			const userData = {
				name: doc.name,
				email: doc.email
			}
			return res.status(200).json({
				success: true,
				message: 'Successfully Signed Up',
				userData
			})
		}
	});
}
export const LoginUser = (req, res) => {
	User.findOne({ 'name': req.body.name }, (err, user) => {
		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid credentials!' });
		} else {
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (!isMatch) {
					return res.status(401).json({ success: false, message: 'Invalid credentials!' });
				} else {
					user.generateToken((err, user) => {
						if (err) {
							return res.status(511).send({success: false, message: 'Token not generated!' });
						} else {
							const data = {
								userID: user._id,
								name: user.name,
								email: user.email,
								token: user.token
							}
							// Saving token to cookie
							res.cookie('authToken', user.token, {maxAge: 28800 * 1000, httpOnly: true}); // Available 8h
							res.redirect('/index')
						}
					});
				}
			});
		}
	});
}
export const LogoutUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.user._id },
		{ token: '' },
		(err) => {
			if (err) return res.json({ success: false, err })
			return res.redirect('/login');
		}
	)
}

// Get authenticated user details
export const getUserDetails = (req, res) => {
	return res.status(200).json({
		isAuthenticated: true,
		name: req.user.name,
		email: req.user.email, 
	});
}

export const getFirstPage = (req, res) => {
	User.findByToken(req.cookies.authToken, (err, user) => {
		if(err) {
			return res.redirect('/login')
		}
		else {
			if(!user) return res.redirect('/login')
				else return res.redirect('/index')
		}
	})
}

export const RegisterRob = async (req, res) => {
	var robot = new Robot(req.body);
	await robot.save((err, doc) => {
		if (err) {
		return res.status(422).json({errors:err})
		} else {
			return res.redirect('/index');
			/*
			const robotData = {
				name: doc.name,
				ipaddress: doc.ipaddress,
			}
			return res.status(200).json({
				success: true,
				message: 'Robot Successfully Added',
				name: doc.name,
				ipaddress: doc.ipaddress,
			})
			*/
		}
	});
}

export const getAlli = async(req, res) => {
    //var docs = await Notif.find({'read':false});
    //res.render(path.join(__dirname,'../public/index.ejs'), {data: docs});
    res.sendFile('/index')
}

export const updateNotif = (req, res) => {
	console.log(req.body.id);
	Notif.findByIdAndUpdate(req.body.id, { $set: { read: true }}, null, (err, doc) => {
		if(err) res.status(400).send({ err });
		else {
			res.status(200).send({})
		}
	});
}
