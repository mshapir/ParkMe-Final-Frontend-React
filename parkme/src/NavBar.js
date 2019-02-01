import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'

class NavBar extends React.Component {
  state = {
    user: this.props.user,
    isLoggedIn: this.props.isLoggedIn
  }

  render() {
    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">ParkMe</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavBar;
