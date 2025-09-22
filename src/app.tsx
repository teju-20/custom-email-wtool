import React, { useState } from "react";
import SendEmail from "./components/SendEmail";
import EmailList from "./components/EmailList";

const App: React.FC = () => {
  const [emails, setEmails] = useState<any[]>([]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Email Workflow Tool</h1>
      <SendEmail setEmails={setEmails} />
      <EmailList emails={emails} />
    </div>
  );
};

export default App;
