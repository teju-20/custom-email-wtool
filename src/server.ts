import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Handle server errors gracefully
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
