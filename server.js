// Create server
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Enter in index.html File
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Enter in Public Folder
app.use(express.static(__dirname + "/public"));

// Setup socket.io connection
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("New user Connected...");

  socket.on("new_user_joined", (user_name) => {
    socket.broadcast.emit("user_joined", user_name);
  });

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });

  // socket.on("disconnect", (user_name) => {
  // socket.broadcast.emit("left", user_name);
  // delete user_name;
  // });
});
