const express = require("express");
//Express
const app = express();

const socketio = require("socket.io");
// Socket.io
const http = require("http");
//Needed for socket.io
const server = http.createServer(app);
//Set up server with express and node js' http.
const io = socketio(server, {
  cors: {
    origin: "https://60c0029f06d4b300d9bf26f8--mousechat-app.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
//Define cors object for server security.

const morgan = require("morgan");
//Shows a console message for each http req.

const cors = require("cors");
//Cors of the app.

require("dotenv").config({ path: "./.env" });
//Dotev to define the .env path file.

const cookieParser = require("cookie-parser");
//Allows cookie managing info.

require("./src/database");
//DB connection.

const PORT = process.env.PORT || 4000;
//Server port.

const { addUser, removeUser, getUser, getUsersInRoom } = require("./chatUsers");
//Require functions to handle socket.io users.

app.set("Port", PORT);
//Define the server port.

app.use(morgan("dev"));

app.use(express.json({ limit: "5mb" }));
//Allow JSON format body parsing and limit size.

app.use(cookieParser());
//Apply cookieParser to all the app. If there're cookies, they will be available at req.cookies.

app.use(
  cors({
    origin: "https://60c0029f06d4b300d9bf26f8--mousechat-app.netlify.app",
    credentials: true,
  })
);
//Set cors for the frontend app.

//SOCKET.IO SETTINGS
io.on("connection", (socket) => {
  // Start with io.on method, that receives a socket as a parameter.
  // After, use the socket.on method to define response for each action.

  // Join event.
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    // Call the addUser method, already defined and imported.

    if (error) {
      return callback(error);
    }

    //Send a message to the user when just join to the room.
    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to the room: "${user.room}"`,
    });

    // Send a message to the rest of users about the new user with socket.broadcast.
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    //Signals the frontend for a next action.
    callback();
  });

  // SendMessage action
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Disconnection action
  socket.on("disconnection", () => {
    const user = removeUser(socket.id);
    console.log("User disconnected");

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
});

//Backend routes and their files.
app.use("/auth/", require("./src/routes/usuario.routes"));
app.use("/myprofile/", require("./src/routes/profile.routes"));

//Start the server with the method .listen().
server.listen(app.get("Port"), () => {
  console.log("Server started on port: ", app.get("Port"));
});
