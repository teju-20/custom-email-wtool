import React, { useState, useEffect } from "react";
import Inbox from "./component/inbox";
import SendEmail from "./component/sendemail";
import { Email, fetchEmails } from "./api/EmailApi";

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);

  // Load on mount
  useEffect(() => {
    const loadEmails = async () => {
      try {
        const data = await fetchEmails();
        setEmails(data);
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };
    loadEmails();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <SendEmail setEmails={setEmails} />
      <Inbox emails={emails} setEmails={setEmails} />
    </div>
  );
};

export default App;
