import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h3>Oops! You are not allowed here and/or broke something!</h3>
        <img src="https://httpstatusdogs.com/img/404.jpg" alt="404 not found"/>
        <p>Please find your way back to safety. In the meantime, enjoy this pup.</p>
      </div>
    )
  }
}
