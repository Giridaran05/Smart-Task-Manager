const List = require("../models/List");


// 🔹 Create List

exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const listCount = await List.countDocuments({ board: boardId });

    const newList = await List.create({
      title,
      board: boardId,
      position: listCount
    });

    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get Lists By Board
exports.getListsByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const lists = await List.find({ boardId })
      .sort({ position: 1 }); // SORTING

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Update List Title
exports.updateList = async (req, res) => {
  try {
    const updated = await List.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Delete List
exports.deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.json({ message: "List deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Reorder Lists (Drag & Drop)
exports.reorderLists = async (req, res) => {
  try {
    const { orderedIds } = req.body;

    for (let i = 0; i < orderedIds.length; i++) {
      await List.findByIdAndUpdate(orderedIds[i], {
        position: i
      });
    }

    res.json({ message: "Lists reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};