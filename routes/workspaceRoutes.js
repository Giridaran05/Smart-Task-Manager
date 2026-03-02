const express = require("express");
const router = express.Router();
const Workspace = require("../models/Workspace");

router.post("/", async (req, res) => {
  try {
    const workspace = await Workspace.create(req.body);
    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const workspaces = await Workspace.find();
  res.json(workspaces);
});

module.exports = router;
