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
    }
  }

  componentDidMount(){
    console.log("Component did mount App");
    setTimeout( () => {
      const newMessage = {id: 3, username:'Yimiao', content: 'Meow! Meow!'};
      const message = this.state.message.concat(newMessage);
      this.setState({ message })
    }, 3000)
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.message}/>
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    )
  }
}
export default App;
