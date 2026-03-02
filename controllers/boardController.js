const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};