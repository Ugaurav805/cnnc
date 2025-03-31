const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },  // Ensure unique title
  description: { type: String, required: true },
  dateTime: { type: Date, required: true },
  duration: { type: Number, default: 60 },
  link: { type: String },
  bannerImage: { type: String },
  backgroundColor: { type: String, default: "#ffffff" },
  password: { type: String },
  participants: [{ name: String, status: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Event", EventSchema);