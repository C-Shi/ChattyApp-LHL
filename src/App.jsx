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
      message: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id:1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id:2
        }
      ]
    };
    // create websocket that connect to the socket channel
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessageHanlder = this.newMessageHanlder.bind(this);
  }

  componentDidMount(){
    console.log("Component did mount App");
    setTimeout( () => {
      const newMessage = {id: this.state.message[this.state.message.length - 1].id + 1, username:'Yimiao', content: 'Meow! Meow!'};
      const message = this.state.message.concat(newMessage);
      this.setState({ message })
    }, 3000)

    // login connection status once socket is open
    this.socket.onopen = function(e) {
      console.log('React Connected to server')
    }
  }

  newMessageHanlder(e){
    const keyCode = e.keyCode || e.which;
    // check if there is anything in the enter box and see if the key is 'enter'
    // if(e.target.value && keyCode === 13) {
    //   // grab the latest id in the dom and add one
    //   const id = this.state.message[this.state.message.length - 1].id + 1;
    //   const username = this.state.currentUser.name;
    //   const newMessage = {
    //     id,
    //     username,
    //     content: e.target.value
    //   }
    //   // update state - use concat instead of push to avoid mutating state directly
    //   const message = this.state.message.concat(newMessage);
    //   this.setState({ message })
    //   // reset value to zero
    //   e.target.value = ''
    // }

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
