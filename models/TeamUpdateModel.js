const mongoose = require("mongoose");

const teamUpdateSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const TeamUpdate = mongoose.model("TeamUpdate", teamUpdateSchema);

module.exports = TeamUpdate;
