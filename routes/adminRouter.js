// routes/subscription.js
const express = require("express");
const router = express.Router();
const { authorizeRoles } = require("../middleware/auth");
const { updateTeam } = require("../controllers/adminController");

router.route("/updateTeam").post(updateTeam);

module.exports = router;
