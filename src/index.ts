import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import emailRoutes from './routes/emailRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
