import { Router } from 'express';
import { getAuthUrl } from '../utils/google0auth';
import { handleGoogleCallback } from '../controllers/authController';

const router = Router();

router.get('/google/url', (req, res) => {
  res.json({ url: getAuthUrl() });
});

router.get('/google/callback', handleGoogleCallback);

export default router;
