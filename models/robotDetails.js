const mongoose = require("mongoose");

// Define schema
const robotDetailsSchema = new mongoose.Schema({
    name: String,
    connected: Boolean,
    ipaddress: String,
    robot: { type: mongoose.Schema.Types.ObjectId, ref: 'Robot' }
});

// Export model
module.exports = mongoose.model("RobotDetails", robotDetailsSchema);