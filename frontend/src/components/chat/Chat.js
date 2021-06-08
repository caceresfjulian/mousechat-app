import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import io from "socket.io-client";
import swal from "sweetalert";
import "./Chat.css";
import Infobar from "../infobar/Infobar";
import Input from "../Input/Input";
import Messages from "../messages/Messages";
import TextContainer from "../textContainer/TextContainer";

let socket;

const ENDPOINT = "https://mousechat-mern.herokuapp.com/";

const Chat = ({ location }) => {
  //Using Router, location shows the current browser's URL.
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const historial = useHistory();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setname(name);
    setroom(room);

    //Join the user to the room
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        swal("Error", error, "error");
        historial.push("/dashboard");
      }
    });

    return () => {
      socket.emit("disconnection");

      socket.off();
    };
  }, [location.search, historial]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  //Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
