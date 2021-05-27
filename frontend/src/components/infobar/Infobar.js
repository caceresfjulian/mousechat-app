import React from "react";
import { Link } from "react-router-dom";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";
import "./Infobar.css";

function Infobar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img src={onlineIcon} className="onlineIcon" alt="online" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <Link to="/">
          <img src={closeIcon} alt="close" />
        </Link>
      </div>
    </div>
  );
}

export default Infobar;
