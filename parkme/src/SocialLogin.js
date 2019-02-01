import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class SocialLogin extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <FacebookLogin appId="1216271218534578" autoLoad={true} fields="name,email,picture" callback={(response) => { console.log(response); }} />
        </div>
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <GoogleLogin
          clientId="612485473615-ffsk2gubgmvfh00jh61qi4l1ggtlkbhm.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={(response) => { console.log(response); }}
          onFailure={(response) => { console.log(response); }} />
        </div>
      </div>
    );
  }
}

export default SocialLogin;
