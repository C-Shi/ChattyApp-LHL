import React, { Component } from 'react';

const Landing = (props) => {
  return (
    <div className="form-style-8">
      <h2>Enter Chat Room</h2>
      <form onSubmit={props.onSubmit}>
        <input type="text" name="field1" placeholder="Full Name" />
        <textarea placeholder="Message" required>Hello, Nice to meet you</textarea>
        <input type="submit" value="Enter" />
      </form>
    </div>
  )
}

export default Landing;