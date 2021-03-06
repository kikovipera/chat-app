import React, { Component } from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { unauthenticate, authenticateUser } from '../Actions/user'

class ChatHeader extends Component {
  constructor () {
    super()
    this.handleShowMenu = this.handleShowMenu.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleHideMenu = this.handleHideMenu.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.state = {
      style: 'none'
    }
  }
  handleSignOut () {
    this.props.dispatch(unauthenticate())
  }
  handleSignIn () {
    this.props.dispatch(authenticateUser())
  }
  handleShowMenu () {
    this.setState({ style: ''})
  }
  handleHideMenu () {
    this.setState({ style: 'none'})
  }
  render () {
    return (
      <div id='chat-header' onMouseLeave={this.handleHideMenu}>
        <div id='user-menu'>
          <button onClick={this.handleShowMenu}>Hi, {this.props.user.name}<div className="arrow-down">&#9660;</div></button>
          <div id='signout-dropdown' style={{'display': this.state.style}}>
            <a href='#' onClick={this.handleSignOut}>Sign out</a>
          </div>
        </div>
        <div id='active-channel-name'>
          <span>{this.props.active.name}</span>
        </div>
        <Login user={this.props.user} handleSignIn={this.handleSignIn}/>
       {/* Add a drop down of the users in channel */}
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    active: state.channels.active
  }
}

export default connect(mapStateToProps)(ChatHeader)
