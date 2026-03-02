const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/:boardId", async (req, res) => {
  const activities = await Activity.find({
    boardId: req.params.boardId,
  }).sort({ createdAt: -1 });

  res.json(activities);
});

module.exports = router;