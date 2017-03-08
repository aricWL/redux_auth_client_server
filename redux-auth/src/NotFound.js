import React, { Component } from 'react'
import ReactPlayer from 'react-player'

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h3>Oops! You are not allowed here!</h3>
        <ReactPlayer url="https://www.youtube.com/watch?v=h_L4Rixya64" playing/>
        <p>Please find your way back to safety. In the meantime, please consider what the Foo Fighters ask of you.</p>
      </div>
    )
  }
}
