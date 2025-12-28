const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Emit random location updates every few seconds
  setInterval(() => {
    const randomLat = 18 + Math.random() * 10;
    const randomLng = 72 + Math.random() * 10;
    io.emit("location_update", [
      { name: "Vehicle 1", lat: randomLat, lng: randomLng },
    ]);
  }, 5000);
});

server.listen(5000, () => console.log("Socket.IO server running on port 5000"));
