import React from 'react';

const Landing = (props) => {
  return (
    <div className="form-style-8">
      <h2>Enter Chat Room</h2>
      <form onSubmit={props.onSubmit}>
        <input type="text" name="field1" placeholder="Full Name" required/>
        <textarea placeholder="Message" defaultValue='Hi, Nice to meet you' required></textarea>
        <input type="submit" value="Enter" />
      </form>
    </div>
  )
}

Landing.propTypes = {
  onSubmit: React.PropTypes.func
}

export default Landing;