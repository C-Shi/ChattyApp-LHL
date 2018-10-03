import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  constructor(){
    super();
  }

  render(){
    const messageList = this.props.messages.map(message => {
      return <Message type={message.type} username={message.username} content={message.content} key={message.id} color={message.color}/>
    })

    return (
      <main className="messages">
        {messageList}
      </main>
    )
  }
}

export default MessageList
