import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Infobar from '../infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../messages/Messages'
import TextContainer from '../textContainer/TextContainer'


let socket;

const Chat = ({ location }) => {
    // gracias al router tenemos acceso a location que nos da la URL actual de la página 
    const [name, setname] = useState('');
    const [room, setroom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT = 'localhost:4000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        // Destructuramos name y room

        socket = io(ENDPOINT);

        setname(name);
        setroom(room);

        // Unir el usuario a la sala
        socket.emit('join', { name, room }, () => {
        });

        return () => {
            socket.emit('disconnected');

            socket.off();
        }

    }, [ENDPOINT, location.search]);
    // solo cuando cambie el ENDPOINT y location.search, se volverá a correr el useEffect

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on ('roomData', ({users}) => {
            setUsers(users)
        });

    }, [messages]);

    // Función para enviar mensajes
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat
