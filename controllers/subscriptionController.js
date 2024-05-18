const User = require("../models/UserModel");
const TeamUpdate = require("../models/TeamUpdateModel");

exports.subscription = async (req, res) => {
  try {
    const { teamId } = req.body;
    if (!teamId) {
      return res.status(400).send({ message: "Please provide a teamId" });
    }
    const user = await User.findById(req.user.id);
    user.subscriptions.push(teamId);
    await user.save();
    res.send({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.allUpdates = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch the user's subscriptions
    const user = await User.findById(userId).populate("subscriptions");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Extract team IDs from the subscriptions array
    const teamIds = user.subscriptions.map((team) => team._id);

    const updates = await TeamUpdate.find({ teamId: { $in: teamIds } }).sort({
      timestamp: -1
    });

    res.send(updates);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching updates" });
  }
};
