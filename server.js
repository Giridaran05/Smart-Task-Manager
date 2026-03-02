const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("Smart Task Manager API Running 🚀");
});

// Route Imports
const boardRoutes = require("./routes/boardRoutes");
const listRoutes = require("./routes/listRoutes");
const cardRoutes = require("./routes/cardRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");

// Route Usage
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/workspaces", workspaceRoutes);

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
});

// ===== Server Start =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});