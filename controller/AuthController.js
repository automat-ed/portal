const path = require('path');
const User = require('../models/users');
const Robot = require("../models/robot");
const Notif = require("../models/notifications");
exports.RegisterUser = async (req, res) => {
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
exports.LoginUser = (req, res) => {
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
exports.LogoutUser = (req, res) => {
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
exports.getUserDetails = (req, res) => {
	return res.status(200).json({
		isAuthenticated: true,
		name: req.user.name,
		email: req.user.email, 
	});
}

exports.getFirstPage = (req, res) => {
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


exports.getAlli = async(req, res) => {
    //var docs = await Notif.find({'read':false});
    //res.render(path.join(__dirname,'../public/index.ejs'), {data: docs});
    res.sendFile('/index')
}

exports.updateNotif = (req, res) => {
	console.log(req.params.id);
	const doc = Notif.findByIdAndUpdate(req.params.id, { $set: { read: true }}, (err, doc) => {
		if(err) return res.status(400).send({ err });
		else
		{
			return res.redirect('/index');
		}
	});
}
