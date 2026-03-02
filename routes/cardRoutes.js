const express = require("express");
const router = express.Router();
const {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  addComment,
  deleteComment,
} = require("../controllers/cardController");

router.post("/", createCard);
router.get("/list/:listId", getCardsByList);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);

// Comments
router.post("/:id/comment", addComment);
router.delete("/:cardId/comment/:commentId", deleteComment);

module.exports = router;