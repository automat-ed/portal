import mongoose from "mongoose";
const { Schema } = mongoose;

// Define subdocuments
const gpsSchema = new Schema({
    latitude: {type: Number, default: null},
    longitude: {type: Number, default: null}
});

const robotStateSchema = new Schema({
    state: {type: String, default: "Off"},
    connected: {type: Boolean, default: false},
    gps: {type: gpsSchema, default: {}}
});

// Define Robot schema
const robotSchema = new Schema({
    name: String,
    key: String,
    state: {type: robotStateSchema, default: {}}
});

// Export model
export default mongoose.model("Robot", robotSchema);
