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

const ENDPOINT = "localhost:4000";

const Chat = ({ location }) => {
  // gracias al router tenemos acceso a location que nos da la URL actual de la página
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const historial = useHistory();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // Destructuramos name y room

    socket = io(ENDPOINT);

    setname(name);
    setroom(room);

    // Unir el usuario a la sala
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
  // solo cuando cambie el ENDPOINT y location.search, se volverá a correr el useEffect

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  // Función para enviar mensajes
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
