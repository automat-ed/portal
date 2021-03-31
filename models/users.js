import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dotenv.config();

var us = new mongoose.Schema({
	name: { type: String, minlength: 6, maxlength: 125, unique: true },
	email: { type: String, minlength: 6, maxlength: 125, unique: true },
	password: { type: String, minlength: 6, maxlength: 125 },
	token: { type: String, default:'' }
});


//saving user data
us.pre('save', function (next) {
	var user = this;
	if (user.isModified('password')) { //checking if password field is available and modified
		bcrypt.genSalt(10, function (err, salt) {
			if (err) return next(err);
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err)
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// For comparing the users entered password with database duing login 
us.methods.comparePassword = function (candidatePassword, callBack) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return callBack(err);
		callBack(null, isMatch);
	});
}

// For generating token when logged in
us.methods.generateToken = function (callBack) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), process.env.ACCESS_TOKEN_SECRET);
	user.token = token;
	user.save(function (err, user) {
		if (err) return callBack(err);
		callBack(null, user);
	});
};

// Validating token for auth routes middleware
us.statics.findByToken = function (token, callBack) {
	var user = this;
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decode) { // This decode must give user_id if token is valid. ie decode=user_id
		user.findOne({ "_id": decode, "token": token }, function (err, user) {
			if (err) return callBack(err);
			callBack(null, user);
		});
	});
};

var users = mongoose.model('users', us);
export default users;
