const Team = require("../models/TeamModel.js");
const TeamUpdate = require("../models/TeamUpdateModel.js");
const { io } = require("../server");

exports.updateTeam = async (req, res) => {
  try {
    const { teamId, changes } = req.body;
    if (!teamId) {
      return res.status(400).send({ message: "Please provide a teamId" });
    }
    const team = await Team.findById(teamId);
    if (team) {
      team.changes.push(changes);
      await team.save();

      // Save the update to the database
      const teamUpdate = new TeamUpdate({
        teamId,
        message: changes.message,
        timestamp: changes.timestamp
      });
      await teamUpdate.save();
      io.to(teamId).emit("teamUpdate", changes); //added socket here
      res.send({ message: "Team updated successfully" });
    } else {
      res.status(404).send({ message: "Team not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
