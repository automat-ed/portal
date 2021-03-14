const mongoose = require("mongoose");

// Define schema
const robotSchema = new mongoose.Schema({
    name: String,
    connected: Boolean,
    key: String,
});

// Export model
module.exports = mongoose.model("Robot", robotSchema);
