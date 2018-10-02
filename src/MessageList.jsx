import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  constructor(){
    super();
  }

  render(){
    const messageList = this.props.messages.map(message => {
      return <Message username={message.username} content={message.content} key={message.id}/>
    })

    return (
      <main className="messages">
        {messageList}
      </main>
    )
  }
}

export default MessageList
