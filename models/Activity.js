const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    action: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);