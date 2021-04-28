import React from 'react'
import './Messages.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../message/Message';

function Messages({ messages, name }) {
    return (
        <ScrollToBottom className="messages">
            {messages.map((message, key) => (
                <div key={key}>
                    <Message message={message} name={name}/>
                </div>)
            )}
        </ScrollToBottom>
    )
}

export default Messages
