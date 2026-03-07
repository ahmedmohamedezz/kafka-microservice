const express = require("express");
const userActivityController = require("./controllers/userActivityController")

const router = express.Router();

router.post("/log", userActivityController.streamEvent);

router.get("/logs", userActivityController.readLogs);

module.exports = router;