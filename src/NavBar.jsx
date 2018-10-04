import React from 'react';

const NavBar = (props) => {
  // let react handle loading time 
  const user = props.totalUsers ? <div>{props.totalUsers} Users Online</div> : <div>Loading Users ... </div>
  return (
    <nav className="navbar">
      <p className="navbar-brand">Chatty Room</p>
      {user}
      <i className="fas fa-trash-alt navbar-brand" onClick={props.clearMessage}></i>
    </nav>
  )
}

NavBar.propTypes = {
  totalUsers: React.PropTypes.string,
  clearMessage: React.PropTypes.func
}

export default NavBar