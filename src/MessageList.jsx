import React, { Component } from 'react';

const MessageList = (props) => {
  const messageList = props.messages.map(message => {
    return (
      <div className="message">
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    )
  })

  return (
    <div>
      {messageList}
    </div>
  )
}

export default MessageList;