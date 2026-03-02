const express = require("express");
const router = express.Router();
const {
  createBoard,
  getBoards,
  getBoardById
} = require("../controllers/boardController");

router.post("/", createBoard);
router.get("/", getBoards);
router.get("/:id", getBoardById); 

module.exports = router;