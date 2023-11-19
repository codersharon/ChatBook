const express = require('express')
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'))

io.on("connection", (socket) => {
socket.on("chat message", (ID, msg, photo, videosrc) => {
console.log(ID, msg);
io.emit("chat message", ID, msg, photo, videosrc);
  console.log(ID, msg);
});
});

http.listen(port, () => {
console.log(`Socket.IO server running at http://localhost:${port}/`);
});
