import React from 'react';
import Message from './Message.jsx'

const MessageList = (props) => {
    const messageList = props.messages.map(message => {
      return <Message type={message.type} username={message.username} content={message.content} key={message.id} color={message.color} avatar={message.avatar}/>
    })

    return (
      <main className="messages" id="message-list">
        {messageList}
      </main>
    )
  
}

MessageList.propTypes = {
  messages: React.PropTypes.object
}

export default MessageList
