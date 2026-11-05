import { Router } from 'express';
import { getAIWeddingAdvice } from '../controllers/aiController';

const router = Router();

router.post('/chat', getAIWeddingAdvice);

export default router;