import React, {Component} from 'react';

const NavBar = (props) => {
  // let react handle loading time 
  const user = props.totalUsers ? <div>{props.totalUsers} Users Online</div> : <div>Loading Users ... </div>
  return (
    <nav className="navbar">
      <p className="navbar-brand">Chatty Room</p>
      {user}
    </nav>
  )
}

export default NavBar