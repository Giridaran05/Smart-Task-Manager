const Board = require("../models/Board");
const List = require("../models/List"); // IMPORTANT

exports.createBoard = async (req, res) => {
  try {
    // 1️⃣ Create Board
    const board = await Board.create({
      title: req.body.title,
    });

    // 2️⃣ Create Default Lists
    const defaultLists = ["To Do", "In Progress", "Done"];

    for (let i = 0; i < defaultLists.length; i++) {
      await List.create({
        title: defaultLists[i],
        boardId: board._id,
        position: i,
      });
    }

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};