import React, { useState } from 'react';
import GoogleLoginButton from './components/GoogleLoginButton';
import EmailList from './components/EmailList';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Mock login handler
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {!loggedIn ? (
        <>
          <h2>Login with Google</h2>
          <GoogleLoginButton onLogin={handleLogin} />
        </>
      ) : (
        <EmailList />
      )}
    </div>
  );
};

export default App;
