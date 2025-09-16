import React, { useState } from "react";
import { sendEmail, SendEmailResponse } from "../api/EmailApi";

interface Email {
  to: string;
  subject: string;
  text: string;
}

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
      setStatus(response.message);
      setEmails((prev) => [...prev, { to, subject, text }]);
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
      />
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <div>{status}</div>
    </div>
  );
};

export default SendEmail;
