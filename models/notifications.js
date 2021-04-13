import mongoose from "mongoose";

var not = new mongoose.Schema({
	read: { type: Boolean, default: false},
	robotName: { type: String, maxlength: 125 },
	problem: { type: String },
	advice: { type: String },
	date: {type: Date, default: Date.now }
});

var notifications = mongoose.model('notifications', not);
export default notifications;