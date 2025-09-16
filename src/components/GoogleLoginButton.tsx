import React from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

interface Props {
  onLoginSuccess: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onLoginFailure: (err: any) => void;
}

const GoogleLoginButton: React.FC<Props> = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;
