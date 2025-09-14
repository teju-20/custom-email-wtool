import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const loginSuccess = (response: any) => {
    console.log('Login Success:', response);
    // handle login success
  };

  const loginFailed = () => {
    console.log('Login Failed');
    // handle login failure
  };

  return (
    <GoogleLogin
      onSuccess={loginSuccess}
      onError={loginFailed}
      useOneTap
    />
  );
};

export default GoogleLoginButton;
