const Card = require("../models/Card");

/* ===============================
   Create Card
================================= */
exports.createCard = async (req, res) => {
  try {
    const { title, listId, priority, dueDate, description } = req.body;

    const card = await Card.create({
      title,
      listId,
      priority,
      dueDate,
      description,
    });

    card.activityLog.push({
      action: `Card created`,
    });

    await card.save();

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   Get Cards by List
================================= */
exports.getCardsByList = async (req, res) => {
  try {
    const cards = await Card.find({
      listId: req.params.listId,
    }).sort({ order: 1 });

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   Update Card (Drag / Edit)
================================= */
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card)
      return res.status(404).json({ message: "Card not found" });

    if (req.body.listId && req.body.listId !== card.listId.toString()) {
      card.activityLog.push({
        action: `Moved to another list`,
      });
    }

    if (req.body.priority && req.body.priority !== card.priority) {
      card.activityLog.push({
        action: `Priority changed to ${req.body.priority}`,
      });
    }

    if (req.body.dueDate) {
      card.activityLog.push({
        action: `Due date updated`,
      });
    }

    Object.assign(card, req.body);

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   Delete Card
================================= */
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card)
      return res.status(404).json({ message: "Card not found" });

    await card.deleteOne();

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   Add Comment
================================= */
exports.addComment = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    const newComment = {
      user: req.body.user || "User",
      text: req.body.text,
    };

    card.comments.push(newComment);

    card.activityLog.push({
      action: `Comment added: "${req.body.text}"`,
    });

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   Delete Comment
================================= */
exports.deleteComment = async (req, res) => {
  try {
    const { cardId, commentId } = req.params;

    const card = await Card.findById(cardId);

    const comment = card.comments.id(commentId);

    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    card.activityLog.push({
      action: `Comment deleted`,
    });

    comment.deleteOne();

    await card.save();

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};