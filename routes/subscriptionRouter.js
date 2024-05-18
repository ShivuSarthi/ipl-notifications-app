// routes/subscription.js
const express = require("express");
const router = express.Router();
const { isAuthenticate } = require("../middleware/auth");
const {
  subscription,
  allUpdates
} = require("../controllers/subscriptionController");

router.route("/subscribe").post(isAuthenticate, subscription);
router.route("/updates").get(isAuthenticate, allUpdates);

module.exports = router;
