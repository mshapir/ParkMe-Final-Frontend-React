import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './styles/SignUpStyling'


class SignUp extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSignUp = event => {
    event.preventDefault()
    fetch('http://localhost:3001/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.confirmPassword
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data);
      if (data.hasOwnProperty('errors')) {
        alert(`${data.errors}`)
      }else {
        localStorage.setItem("token", data.token)
        this.props.updateUser(data.user)
        alert(`User ${data.user.username} was created`)
      }
    })

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <h2>Sign Up</h2>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-name"
          label="Name"
          name="name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-required"
          label="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />

        <TextField
          required
          id="outlined-confirm-password"
          label="Confirm Password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
          className={classes.textField}
          type="password"
          margin="normal"
          variant="outlined"
        />

        <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={this.handleSignUp}>
          Sign Up
        </Button>
      </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
