// models/Team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  players: [String],
  changes: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
