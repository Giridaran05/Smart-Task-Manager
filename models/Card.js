const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const activitySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true
    },

    dueDate: {
      type: Date,
      default: null
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    labels: {
      type: [String],
      default: []
    },

    comments: {
      type: [commentSchema],
      default: []
    },

    activityLog: {
      type: [activitySchema],
      default: []
    },

    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);