const Card = require("../models/Card");


// ===============================
// CREATE CARD
// ===============================
exports.createCard = async (req, res) => {
  try {
    const { title, description, listId, priority, dueDate } = req.body;

    if (!title || !listId) {
      return res.status(400).json({ message: "Title and listId required" });
    }

    const lastCard = await Card.findOne({ listId })
      .sort({ position: -1 });

    const newCard = new Card({
      title,
      description,
      listId,
      priority,
      dueDate,
      position: lastCard ? lastCard.position + 1 : 0,
      activityLog: [{ action: "Card created" }]
    });

    await newCard.save();
    res.status(201).json(newCard);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// GET CARDS BY LIST
// ===============================
exports.getCardsByList = async (req, res) => {
  try {
    const cards = await Card.find({ listId: req.params.listId })
      .sort({ position: 1 });

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// UPDATE CARD
// ===============================
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    Object.assign(card, req.body);

    card.activityLog.push({ action: "Card updated" });

    await card.save();
    res.json(card);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// DELETE CARD
// ===============================
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    await card.deleteOne();
    res.json({ message: "Card deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// REORDER CARDS (Same List)
// ===============================
exports.reorderCards = async (req, res) => {
  try {
    const { orderedIds } = req.body;

    if (!orderedIds || !orderedIds.length) {
      return res.status(400).json({ message: "orderedIds required" });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { position: index }
      }
    }));

    await Card.bulkWrite(bulkOps);

    res.json({ message: "Cards reordered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// MOVE CARD BETWEEN LISTS
// ===============================
exports.moveCard = async (req, res) => {
  try {
    const { cardId, targetListId } = req.body;

    if (!cardId || !targetListId) {
      return res.status(400).json({ message: "cardId and targetListId required" });
    }

    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const lastCard = await Card.findOne({ listId: targetListId })
      .sort({ position: -1 });

    card.listId = targetListId;
    card.position = lastCard ? lastCard.position + 1 : 0;

    card.activityLog.push({ action: "Card moved to another list" });

    await card.save();

    res.json(card);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ===============================
// ADD COMMENT
// ===============================
exports.addComment = async (req, res) => {
  try {
    const { text, user } = req.body;

    if (!text || !user) {
      return res.status(400).json({ message: "text and user required" });
    }

    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.comments.push({ text, user });
    card.activityLog.push({ action: "Comment added" });

    await card.save();

    res.json(card);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};