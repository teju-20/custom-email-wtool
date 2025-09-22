import React, { useEffect, useState } from "react";
import { fetchEmails, Email } from "../api/EmailApi";
import { getAIReply } from "../api/aiApi";

interface Props {
  emails: Email[];
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
}

const Inbox: React.FC<Props> = ({ emails, setEmails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Load emails only if empty
  useEffect(() => {
    const loadEmails = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchEmails();
        setEmails(data);
      } catch (err) {
        console.error("Failed to fetch emails", err);
        setError("Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    };

    if (emails.length === 0) loadEmails();
  }, [emails.length, setEmails]);

  const handleReply = (to: string, subject: string) => {
    alert(`Reply sent to ${to} with subject: "${subject}"\nMessage: ${replyText}`);
    setReplyingTo(null);
    setReplyText("");
  };

  const handleSuggestReply = async (snippet: string) => {
    try {
      setAiLoading(true);
      const suggestion = await getAIReply(snippet || "");
      setReplyText(suggestion);
    } catch (err) {
      console.error("AI suggestion failed", err);
      alert("AI suggestion failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Inbox</h2>

      {loading && <p>Loading emails...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {emails.map((email, index) => (
          <li
            key={email.id || index}
            style={{ marginBottom: 15, borderBottom: "1px solid #ccc", padding: 10 }}
          >
            <strong>From:</strong> {email.from || "Unknown"} <br />
            <strong>Subject:</strong> {email.subject || "(No subject)"} <br />
            <strong>Snippet:</strong> {email.snippet || "(No content)"} <br />

            <button onClick={() => setReplyingTo(email.id || "")}>Reply</button>

            {replyingTo === email.id && (
              <div style={{ marginTop: 10 }}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                  cols={40}
                />
                <div style={{ marginTop: 5 }}>
                  <button onClick={() => handleReply(email.from || "", email.subject || "")}>
                    Send Reply
                  </button>
                  <button
                    onClick={() => handleSuggestReply(email.snippet || "")}
                    disabled={aiLoading}
                    style={{ marginLeft: 5 }}
                  >
                    {aiLoading ? "Generating..." : "Suggest Reply"}
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
