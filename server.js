const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// 🔥 IMPORTANT FIX
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://heroic-licorice-ed4a16.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Task Manager API Running 🚀");
});

app.use("/api/boards", require("./routes/boardRoutes"));
app.use("/api/lists", require("./routes/listRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));
app.use("/api/workspaces", require("./routes/workspaceRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});