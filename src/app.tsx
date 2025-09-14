import React, { useState } from 'react';
import GoogleLoginButton from './components/GoogleLoginButton';
import EmailList from './components/EmailList';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Improve with proper auth logic

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      {!loggedIn ? (
        <>
          <h2>Login with Google</h2>
          <GoogleLoginButton />
        </>
      ) : (
        <EmailList />
      )}
    </div>
  );
};

export default App;
