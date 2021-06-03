import React from "react";
import { Link } from "react-router-dom";
import onlineIcon from "../../icons/onlineIcon.png";
import { Icon } from "@iconify/react";
import closeFilled from "@iconify/icons-carbon/close-filled";
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
          <Icon id="infobar-close" icon={closeFilled} />
        </Link>
      </div>
    </div>
  );
}

export default Infobar;
