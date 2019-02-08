import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    paddingRight: '5px'
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: false,
    anchorEl: null,
    user: this.props.user,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/*
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            */}
            <div className={classes.avatar}>
              <Avatar aria-label="ParkMe" src={require("./logo.png")} />
            </div>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              ParkMe
            </Typography>
            { this.props.user.id ? <div><Link to={'/home'} style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Listings</Button>
            </Link>
            {this.state.auth ? <Button color="inherit">My Listings</Button> : <Link to={'/reservations'} style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">My Reservations</Button></Link>}
            {this.state.auth ? <Link to={'/newlisting'} style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Create Listing</Button> </Link> : ''}
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                }
                label={auth ? 'Admin' : 'User'}
              />
              <Button color="inherit" onClick={(e) => this.props.logout(e)}>Log Out</Button>
            </FormGroup> </div> : <div>
             <Link to='/signup'><Button color="inherit" style={{ textDecoration: 'none', color: 'white' }}>Sign Up</Button></Link>
             <Link to='/login'><Button color="inherit" style={{ textDecoration: 'none', color: 'white' }}>Login</Button></Link>
             </div>}
            {this.state.user.id && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
