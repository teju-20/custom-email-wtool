import React from "react";

interface Props {
  emails: any[];
}

const EmailList: React.FC<Props> = ({ emails }) => {
  return (
    <div>
      <h3>Sent Emails</h3>
      <ul>
        {emails.map((email, idx) => (
          <li key={idx}>
            <b>To:</b> {email.to}, <b>Subject:</b> {email.subject}, <b>Message:</b> {email.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
