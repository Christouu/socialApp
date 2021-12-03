const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  return (
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId })
  );
};

const removeUser = (socketId) => {
  return (users = users.filter((u) => u.socketId !== socketId));
};

const getUser = (userId) => {
  return users.find((u) => u.userId === userId);
};

io.on("connection", (socket) => {
  //when connecting
  console.log("user connected");
  //take userId and socketId from client
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnecting
  socket.on("disconnect", () => {
    console.log("user disconnected");
    //remove a user when he dc's, then send all onlien users again to the client
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
