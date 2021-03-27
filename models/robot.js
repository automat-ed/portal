import mongoose from "mongoose";
const { Schema } = mongoose;

// Define subdocuments
const gpsSchema = new Schema({
    latitude: Number,
    longitude: Number
});


const robotStateSchema = new Schema({
    state: {type: String, default: "Off"},
    connected: {type: Boolean, default: false},
    gps: gpsSchema
});

// Define Robot schema
const robotSchema = new Schema({
    name: String,
    key: String,
    state: robotStateSchema
});



// Export model
export default mongoose.model("Robot", robotSchema);
