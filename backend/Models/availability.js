const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dayOfWeek: { type: Number, required: true }, // 0 (Sunday) - 6 (Saturday)
    startTime: { type: String, required: true }, // HH:MM format
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
});

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;
