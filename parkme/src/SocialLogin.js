import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class SocialLogin extends Component {
  facebookCallback = (response) => {
    console.log(response);
    if (response.hasOwnProperty('userID')) {
      this.props.updateUser(response)
    } else {
      alert(response.error)
    }
  }

  googleSuccessCallback = (response) => {
    console.log(response);
    console.log(response.profileObj);
    this.props.updateUser(response)
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
