const express = require("express");
const router = express.Router();

const {
  createCard,
  getCardsByList,
  updateCard,
  deleteCard,
  reorderCards,
  moveCard,
  addComment
} = require("../controllers/cardController");

// ===============================
// CARD ROUTES
// ===============================

// Create Card
router.post("/", createCard);

// Get Cards by List
router.get("/list/:listId", getCardsByList);

// Update Card
router.patch("/:id", updateCard);

// Delete Card
router.delete("/:id", deleteCard);

// Reorder Cards (Same List)
router.patch("/reorder/all", reorderCards);

// Move Card Between Lists
router.patch("/move", moveCard);

// Add Comment
router.post("/:id/comment", addComment);

module.exports = router;