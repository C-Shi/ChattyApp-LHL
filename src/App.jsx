import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import Landing from './Landing.jsx';

class App extends Component {
  constructor () {
    super();
    this.state = {
      currentUser: {
        name: '',
      },
      message: [],
      totalUsers: ''
    };
    // create websocket that connect to the socket channel
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessageHanlder = this.newMessageHanlder.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.enterRoomHandler = this.enterRoomHandler.bind(this);
  }

  componentDidMount(){
    this.renderMessage();
    const color = this.generateRandomColor();
    const currentUser = {
      name: this.state.currentUser.name,
      color,
    }
    this.setState({ currentUser });
  }

  componentDidUpdate(){
    const body = document.getElementsByTagName('body')[0];
    if (body.scrollHeight - 120 > body.clientHeight) {
      body.scrollTop = body.scrollHeight;
    } else if(body.scrollHeight - 120 < body.clientHeight) {
      body.scrolltop = 0;
    }
  }

  generateRandomColor() {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }

  // this method listen to the incoming broadcast messages from server 
  // this method treat both message/notification as message, update state's message
  renderMessage() {
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type) {
        // attach incoming message to state
        // Treat notification as a type of message
        const incomingMsg = data;
        this.setState(
          { message: this.state.message.concat(incomingMsg)}
        )
      } else {
        // add this set time out animation to offset weired user exp when loading time is milisecond
        setTimeout(() => {
          this.setState({totalUsers: data})
        }, 400)
      }
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
        color: this.state.currentUser.color,
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
      const currentUser = {
        name,
        color: this.state.currentUser.color
      }
      this.setState({ currentUser })

      // as everybody start from Anonymous, there is no point to show notification if some change Anonymous to real name
      // also if user does not change anything but only type enter, do not show notification
      if (preUser !== 'Anonymous' && e.target.value !== preUser) {
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

  // this handler will take care of the initial username enter
  // we do not want any Ananoymos user
  enterRoomHandler (e) {
    e.preventDefault();
    const username = e.target.elements[0].value;
    const greeting = e.target.elements[1].value;
    const msg = {
      // attached a type of msg to server, so when received, will know if this is a message or notification
      type: 'notification',
      username,
      content: `${username} Enter Room: ${greeting}`
    }
    this.socket.send(JSON.stringify(msg));
    const preUser = this.state.currentUser;
    this.setState({currentUser: {name: username, color: preUser.color}})
  }
  render() {
    // render form or chat form depands on user
    const page = this.state.currentUser.name ? 
      <div>
          <NavBar totalUsers={this.state.totalUsers}/>
          {/* b/c notification and message are both treated as message, 
            it will passed down to <Message /> Component and apply different logic there 
            this <App /> component do not perform and logic on what should render
          */}
          <MessageList messages={this.state.message}/>
          <ChatBar currentUser={this.state.currentUser} messageHanlder={(e) => this.newMessageHanlder(e)} nameHandler={(e) => this.changeNameHandler(e)}/>
        </div>
      :
      <div>
        <Landing onSubmit={(e) => this.enterRoomHandler(e)}/>
      </div>

    return page;
  }
}
export default App;
