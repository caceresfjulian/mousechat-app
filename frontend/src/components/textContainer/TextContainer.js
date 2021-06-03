import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";
// Probando el control de versiones git

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ alignSelf: "center" }}>Online now:</h1>
        <div className="activeContainer">
          <span>
            {users
              .filter((user) => users.indexOf(user) < 5)
              .map((user) => {
                return (
                  <span key={user.id}>
                    {user.name}
                    <img alt="Online Icon" src={onlineIcon} />
                  </span>
                );
              })}
            {users.length > 5 ? (
              <p style={{ textJustify: "revert" }}>
                And {users.length - 5} more...
              </p>
            ) : null}
          </span>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
