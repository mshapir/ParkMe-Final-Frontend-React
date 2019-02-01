import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import Login from './Login.js'
import SocialLogin from './SocialLogin.js'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">ParkMe</Typography>
          </Toolbar>
        </AppBar>
        <Login />
        <SocialLogin />
      </div>
    );
  }
}

export default App;
