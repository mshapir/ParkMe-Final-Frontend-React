import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class SocialLogin extends Component {
  facebookCallback = (response) => {
    console.log(response);
    if (response.hasOwnProperty('userID')) {
      fetch('http://localhost:3001/api/v1/users/social_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: response.name,
          username: response.email,
          password: response.id
        })
      })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem("token", data.token)
        this.props.updateUser(data.user)
      })
    } else {
      alert(response.error)
    }
  }

  googleSuccessCallback = (response) => {
    console.log(response.profileObj);
    if (response.profileObj.hasOwnProperty('googleId')) {
      fetch('http://localhost:3001/api/v1/users/social_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: response.profileObj.givenName,
          username: response.profileObj.email,
          password: response.profileObj.googleId
        })
      })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem("token", data.token)
        this.props.updateUser(data.user)
      })
    } else {
      alert(response.error)
    }
  }

  googleFailureCallback = (response) => {
    alert(response.error)
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <FacebookLogin appId="1216271218534578" autoLoad={false} fields="name,email,picture" callback={this.facebookCallback} />
        </div>
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <GoogleLogin
          clientId="612485473615-ffsk2gubgmvfh00jh61qi4l1ggtlkbhm.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={this.googleSuccessCallback}
          onFailure={this.googleFailureCallback} />
        </div>
      </div>
    );
  }
}

export default SocialLogin;
