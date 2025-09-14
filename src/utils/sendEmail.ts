import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export default sendEmail;

src-index.ts
import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();

const app = express(); // <- no type annotations here, let TS infer

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/emails", emailRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the Custom Email Workflow Tool API 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

backend-ts
\-.env
PORT=5000
EMAIL_USER=mack.schiller5@ethereal.email
EMAIL_PASS=upqV692vdrxkSaGwRn