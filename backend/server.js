const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received data length:", message.length);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});