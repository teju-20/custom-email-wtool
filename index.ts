import express from 'express';
import dotenv from 'dotenv';

import emailRoutes from '. ./routes/emailRoutes';
import authRoutes from '. ./routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route for authentication APIs e.g. OAuth login
app.use('/api/auth', authRoutes);

// Route for email-related APIs (requires authentication)
app.use('/api/emails', emailRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
