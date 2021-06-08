import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

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
          <div>
            {users
              .filter((user) => users.indexOf(user) < 5)
              .map((user) => {
                return (
                  <h4 key={user.id} style={{ fontWeight: "1" }}>
                    {user.name}
                    <img alt="Online Icon" src={onlineIcon} />
                  </h4>
                );
              })}
            {users.length > 5 ? (
              <p style={{ textJustify: "revert" }}>
                And {users.length - 5} more...
              </p>
            ) : null}
          </div>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
