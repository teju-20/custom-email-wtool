import express from 'express';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Handle server errors gracefully
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Add your middleware and routes here

export default app;