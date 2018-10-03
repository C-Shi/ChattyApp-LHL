import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentUser: {
        name: 'Anonymous'
      },
      message: []
    };
    // create websocket that connect to the socket channel
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessageHanlder = this.newMessageHanlder.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
  }

  componentDidMount(){
    this.renderMessage();
  }

  // this method listen to the incoming broadcast messages from server 
  // this method treat both message/notification as message, update state's message
  renderMessage() {
    this.socket.onmessage = (e) => {
      const incomingMsg = JSON.parse(e.data);
      // attach incoming message to state
      // Treat notification as a type of message
      this.setState(
        {message: this.state.message.concat(incomingMsg)}
      )
    }
  }

  // this handler will detect new message and update states and send message to server
  newMessageHanlder(e){
    const keyCode = e.keyCode || e.which;

    if(e.target.value && keyCode === 13) {
      const msg = {
        // attached a type of msg to server, so when received, will know if this is a message or notification
        type: 'message',
        username: this.state.currentUser.name,
        content: e.target.value
      }
      this.socket.send(JSON.stringify(msg));
      e.target.value = "";
    }
  }

  // this handler will detect username change, update current state, and send info to server
  changeNameHandler(e) {
    const keyCode = e.keyCode || e.which;

    if(e.target.value && keyCode === 13){
      const name = e.target.value;
      // update current state user
      const preUser = this.state.currentUser.name;
      this.setState({currentUser: { name }})

      // as everybody start from Anonymous, there is no point to show notification if some change Anonymous to real name
      if (preUser !== 'Anonymous') {
        // when update, send to server and let everyone else know
        const notification = {
          type: 'notification',
          content: `${preUser} has change name to ${name}`
        }
        // send notification to websocket server
        this.socket.send(JSON.stringify(notification));
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        {/* b/c notification and message are both treated as message, 
          it will passed down to <Message /> Component and apply different logic there 
          this <App /> component do not perform and logic on what should render
        */}
        <MessageList messages={this.state.message}/>
        <ChatBar currentUser={this.state.currentUser} messageHanlder={(e) => this.newMessageHanlder(e)} nameHandler={(e) => this.changeNameHandler(e)}/>
      </div>
    )
  }
}
export default App;
