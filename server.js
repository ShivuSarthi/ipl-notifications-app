const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const ConnectDatabase = require("./config/database");

// Initialize the app and create a server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require("dotenv").config({ path: "config/config.env" });

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
ConnectDatabase();

// Static files
app.use(express.static("public"));

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("subscribe", (teamId) => {
    socket.join(teamId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Export io for use in other modules
module.exports = { io };

// Routes
const userRoutes = require("./routes/userRouter");
const subscriptionRoutes = require("./routes/subscriptionRouter");
const adminRoutes = require("./routes/adminRouter");

app.use("/api/auth", userRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
