import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();
    this.state = {
      emoji: [
        '\u{1F601}', '\u{1F602}', '\u{1F603}', '\u{1F604}', '\u{1F605}','\u{1F606}', '\u{1F607}', '\u{1F608}', '\u{1F609}', '\u{1F60A}', '\u{1F60B}', '\u{1F60C}', '\u{1F60D}', '\u{1F60E}', '\u{1F60F}',
        '\u{1F610}','\u{1F611}', '\u{1F612}', '\u{1F613}', '\u{1F614}', '\u{1F615}', '\u{1F616}', '\u{1F617}', '\u{1F618}', '\u{1F619}', '\u{1F61A}', '\u{1F61B}', '\u{1F61C}', '\u{1F61D}', '\u{1F61E}', '\u{1F61F}',
        '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}', '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}', '\u{1F62A}', '\u{1F62B}', '\u{1F62C}', '\u{1F62D}', '\u{1F62E}', '\u{1F62F}',
        '\u{1F630}', '\u{1F631}', '\u{1F632}', '\u{1F633}', '\u{1F634}', '\u{1F635}', '\u{1F636}', '\u{1F637}', '\u{1F638}', '\u{1F639}', '\u{1F63A}', '\u{1F63B}', '\u{1F63C}', '\u{1F63D}', '\u{1F63E}', '\u{1F63F}', 
      ]
    }
  }

  clickHandler(e){
    const emj = e.target.innerHTML;
    const board = document.getElementsByClassName('board')[0];
    const input = document.getElementById('input-message');
    input.value = input.value + emj;
    board.classList.add('hide');

  }

  toggleHandler() {
    const board = document.getElementsByClassName('board')[0];
    board.classList.toggle('hide');
  }

  render() {

    const emoji = this.state.emoji.map((em) => {
      return <div className="em" onClick={(e) => this.clickHandler(e)} key={em}>{em}</div>
    })
    const board = <div className="board hide">{emoji}</div>

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name || 'Anonymous'} onKeyPress={this.props.nameHandler} />
        <div>
          {board}	
          <p><i className="far fa-smile-wink" onClick={this.toggleHandler}></i></p>
        </div>
        <input id="input-message" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.messageHanlder}/>
      </footer>
    )
  }
}

ChatBar.propTypes = {
  currentUser: React.PropTypes.object,
  nameHandler: React.PropTypes.func,
  messageHanlder: React.PropTypes.func
}

export default ChatBar;