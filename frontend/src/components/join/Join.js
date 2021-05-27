import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Join.css';


function Join() {

    const { validProfile } = useContext(AuthContext);

    const name = validProfile.username;
    const [room, setRoom] = useState("room1");

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
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
