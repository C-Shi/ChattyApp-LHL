import React, {Component} from 'react';

const Message = (props) => {
  // console.log(props.username)
  return (
    <div className="message">
      <span className="message-username">{props.username}</span>
      <span className="message-content">{props.content}</span>
    </div>
  )
}

export default Message;


