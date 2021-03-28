import mongoose from "mongoose";
const { Schema } = mongoose;

// Define subdocuments
const robotStateSchema = new Schema({
  connected: { type: Boolean, default: false },
  battery: { type: Number, default: null },
  state: { type: String, default: "Off" },
  gps: {
    lat: { type: String, default: null },
    lng: { type: String, default: null },
  },
});

// Define Robot schema
const robotSchema = new Schema({
  name: String,
  key: { type: String, index: true },
  state: { type: robotStateSchema, default: {} },
});

// Export model
export default mongoose.model("Robot", robotSchema);
