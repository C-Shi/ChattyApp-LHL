import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  constructor(){
    super();
  }

  render(){
    const messageList = this.props.messages.map(message => {
      return <Message type={message.type} username={message.username} content={message.content} key={message.id} color={message.color} avatar={message.avatar}/>
    })

    return (
      <main className="messages" id="message-list">
        {messageList}
      </main>
    )
  }
}

MessageList.propTypes = {
  messages: React.PropTypes.object
}

export default MessageList
