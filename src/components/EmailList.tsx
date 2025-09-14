import React, { useEffect, useState } from 'react';

interface Email {
  id: string;
  snippet: string;
  headers: { name: string; value: string }[];
}

const EmailList: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/emails', {
      credentials: 'include', // include cookies/session if any
    })
      .then(res => res.json())
      .then(data => setEmails(data))
      .catch(err => console.error('Failed to fetch emails:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading emails...</p>;

  return (
    <div>
      <h3>Your Inbox</h3>
      <ul>
        {emails.map(email => {
          const subjectHeader = email.headers.find(h => h.name === 'Subject');
          const fromHeader = email.headers.find(h => h.name === 'From');

          return (
            <li key={email.id}>
              <strong>{subjectHeader?.value || '(No Subject)'}</strong> - {fromHeader?.value} <br />
              <small>{email.snippet}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmailList;
