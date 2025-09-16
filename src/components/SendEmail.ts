import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // Configure transporter with your Gmail or SMTP credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // your Gmail address
        pass: process.env.EMAIL_PASS,   // app password, not your real Gmail password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { message: "Failed to send email" };
  }
};
