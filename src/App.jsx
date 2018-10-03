import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentUser: {
        name: 'Bob'
      },
      message: []
    };
    // create websocket that connect to the socket channel
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessageHanlder = this.newMessageHanlder.bind(this);
  }

  componentDidMount(){
    this.updateMessage();
  }

  updateMessage() {
    this.socket.onmessage = (e) => {
      const incomingMsg = JSON.parse(e.data);
      // attach incoming message to state
      this.setState(
        {message: this.state.message.concat(incomingMsg)}
      )
    }
  }


  newMessageHanlder(e){
    const keyCode = e.keyCode || e.which;

    if(e.target.value && keyCode === 13) {
      const msg = {
        username: this.state.currentUser.name,
        content: e.target.value
      }
      this.socket.send(JSON.stringify(msg));
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.message}/>
        <ChatBar currentUser={this.state.currentUser} messageHanlder={(e) => this.newMessageHanlder(e)}/>
      </div>
    )
  }
}
export default App;
