import React from 'react'
import './Input.css'

function Input({ message, setMessage, sendMessage }) {
    return (
        <form className="form">
            <input
                placeholder="Escribe un mensaje..."
                className="input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
            <button className="sendButton" onClick={e => sendMessage(e)}>Enviar</button>
        </form>
    )
}

export default Input
