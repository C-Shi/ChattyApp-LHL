import React, {Component} from 'react';

const NavBar = (props) => {
  // let react handle loading time 
  const user = props.totalUsers ? <span>{props.totalUsers} Users Online</span> : <span>Loading Users ... </span>
  return (
    <h1 className="navbar">
      Chatty &nbsp;
      {user}
    </h1>
  )
}

export default NavBar