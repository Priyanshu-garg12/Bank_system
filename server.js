const connectDB = require("./server/config/db");
const path = require("path");
const express = require("express");

const app = express();

// Initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect Database
connectDB();
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Define Routes
app.use("/api", require("./server/routes/api"));

// Serve static assets in production
app.use(express.static("build"));

// Serve React app for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
