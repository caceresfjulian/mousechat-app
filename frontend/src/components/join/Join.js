import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import io, { Socket } from 'socket.io-client'
import './Join.css'

// let socket;

function Join() {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("room1");
    // const [users, setUsers] = useState("");
    // const ENDPOINT = 'localhost:4000'

    // useEffect(() => {
    //     socket = io(ENDPOINT);

    //     socket.on('roomData', ({users}) => {
    //         setUsers(users)
    //     });
    // })

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <select placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}>
                        <option value="room1">Room 1</option>
                        <option value="room2">Room 2</option>
                        <option value="room3">Room 3</option>
                    </select>
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Join
