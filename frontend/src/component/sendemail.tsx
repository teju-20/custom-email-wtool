import React, { useState } from "react";
import { sendEmail, SendEmailResponse, Email } from "../api/EmailApi";

interface Props {
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
}

const SendEmail: React.FC<Props> = ({ setEmails }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    if (!to || !subject || !text) {
      setStatus("❌ Please fill all fields");
      return;
    }

    try {
      const response: SendEmailResponse = await sendEmail(to, subject, text);

      // Add to state
      setEmails((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          to,
          subject,
          text,
          from: "me@example.com", // simulate sender
          snippet: text.substring(0, 50),
          date: new Date().toISOString(),
        },
      ]);

      setStatus(response.message);
      setTo("");
      setSubject("");
      setText("");
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("❌ Error sending email");
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="email"
        placeholder="Recipient Email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ display: "block", marginBottom: 5, width: "100%" }}
      />
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ display: "block", marginBottom: 5, width: "100%" }}
      />
      <textarea
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ display: "block", marginBottom: 5, width: "100%" }}
      />
      <button onClick={handleSend}>Send</button>
      {status && <div style={{ marginTop: 5 }}>{status}</div>}
    </div>
  );
};

export default SendEmail;
