import React, { useEffect, useState } from "react";
import { fetchEmails, Email } from "../api/EmailApi";
import { sendEmail, SendEmailResponse } from "../api/EmailApi";
import { getAIReply } from "../api/aiApi";

interface Props {
  userId: string;
}

const Inbox: React.FC<Props> = ({ userId }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [status, setStatus] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const getEmails = async () => {
      try {
        setLoading(true);
        const fetchedEmails = await fetchEmails();
        setEmails(fetchedEmails);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    };
    getEmails();
  }, [userId]);

  const handleReply = async (to: string) => {
    if (!to) return;
    try {
      const response: SendEmailResponse = await sendEmail(to, "Re: ", replyText);
      setStatus(response.message);
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending reply");
    }
  };

  const handleSuggestReply = async (emailContent: string) => {
    if (!emailContent) return;
    try {
      setAiLoading(true);
      const aiReply = await getAIReply(emailContent);
      setReplyText(aiReply);
    } catch (err) {
      console.error(err);
      setStatus("❌ AI suggestion failed");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div>Loading emails...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Inbox</h2>
      {emails.length === 0 && <div>No emails found.</div>}
      <ul>
        {emails.map((email) => (
          <li
            key={email.id}
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #ccc",
              paddingBottom: 5,
            }}
          >
            <strong>From:</strong> {email.from} <br />
            <strong>Subject:</strong> {email.subject} <br />
            <strong>Date:</strong> {email.date} <br />
            <strong>Snippet:</strong> {email.snippet} <br />
            <button onClick={() => setReplyingTo(email.from)}>Reply</button>

            {replyingTo === email.from && (
              <div style={{ marginTop: 5 }}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply"
                  rows={3}
                  style={{ width: "100%" }}
                />
                <div style={{ marginTop: 5 }}>
                  <button onClick={() => handleReply(email.from)}>Send Reply</button>
                  <button
                    onClick={() => handleSuggestReply(email.snippet)}
                    disabled={aiLoading}
                    style={{ marginLeft: 5 }}
                  >
                    {aiLoading ? "Suggesting..." : "Suggest Reply"}
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>{status}</div>
    </div>
  );
};

export default Inbox;
