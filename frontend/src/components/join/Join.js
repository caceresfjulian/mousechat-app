import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Fade from "react-reveal";
import "./Join.css";

function Join() {
  const { validProfile } = useContext(AuthContext);

  const name = validProfile.username;
  const [room, setRoom] = useState("room1");

  return (
    <Fade>
      <div className="join-container">
        <div className="join-box">
          <h1>Choose a room</h1>
          <div>
            <span
              className={
                room === "room1"
                  ? "join-box-options room-selected"
                  : "join-box-options"
              }
              onClick={() => setRoom("room1")}
            >
              Room 1
            </span>
            <span
              className={
                room === "room2"
                  ? "join-box-options room-selected"
                  : "join-box-options"
              }
              onClick={() => setRoom("room2")}
            >
              Room 2
            </span>
            <span
              className={
                room === "room3"
                  ? "join-box-options room-selected"
                  : "join-box-options"
              }
              onClick={() => setRoom("room3")}
            >
              Room 3
            </span>
            <Link
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?name=${name}&room=${room}`}
            >
              <button id="join-button" className="py10x50 mb20" type="submit">
                <h2 style={{ margin: 0, fontWeight: 1 }}>Join</h2>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Join;
