// sendemail.ts
import nodemailer from "nodemailer";

/**
 * Sends an email using Nodemailer configured with Gmail SMTP.
 * 
 * @param to Recipient email address
 * @param subject Email subject line
 * @param text Text body of the email
 * @returns Promise resolving to a message indicating success or failure
 */
export const sendemail = async (
  to: string,
  subject: string,
  text: string
): Promise<{ message: string }> => {
  try {
    // Create reusable transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (must be set in .env)
        pass: process.env.EMAIL_PASS, // App password generated in your Google account
      },
    });

    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { message: "Failed to send email" };
  }
};
