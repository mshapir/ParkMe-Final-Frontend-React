import React, { Component } from 'react';
import NavBar from './NavBar.js'
import Login from './Login.js'
import SocialLogin from './SocialLogin.js'

class App extends Component {
  state={
    user: null,
    isLoggedIn: false
  }

  updateUser = (user) => {
    this.setState({
      user,
      isLoggedIn: true
    })
  }

  render() {
    return (
      <div>
        <NavBar user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
        {!this.state.isLoggedIn ? <div><Login updateUser={this.updateUser}/><SocialLogin updateUser={this.updateUser}/></div> : <div>Hello</div>}
      </div>
    );
  }
}

export default App;
