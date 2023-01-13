require("dotenv").config(); // load .env variables

const PORT = process.env.SOCKET_PORT || 5000;
const app = require("express");
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(cors());
app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working");
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data.room);
    socket.to(data.room).emit("receive_joining", data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

http.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
