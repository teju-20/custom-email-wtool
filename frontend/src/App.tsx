import React from "react";
import Inbox from "./component/inbox";

function App() {
  const userId = "YOUR_LOGGED_IN_USER_ID"; // replace with actual user ID

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <Inbox userId={userId} />
    </div>
  );
}

export default App;
