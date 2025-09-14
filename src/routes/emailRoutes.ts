import { Router } from 'express';
import { listEmails } from '../controllers/emailController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/', authenticate, listEmails);

export default router;
