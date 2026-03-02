const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.post("/", listController.createList);
router.get("/:boardId", listController.getListsByBoard);
router.patch("/:id", listController.updateList);
router.delete("/:id", listController.deleteList);
router.patch("/reorder/all", listController.reorderLists);

module.exports = router;