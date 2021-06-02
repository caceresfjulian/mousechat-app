import React from "react";
import "./Input.css";

function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="form">
      <input
        placeholder="Type your message..."
        className="input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 100,
        }}
      >
        <button className="sendButton" onClick={(e) => sendMessage(e)}>
          Send
        </button>
      </div>
    </form>
  );
}

export default Input;
