import express from 'express';
import Verify from '../middlewares/verify';
import SignController from '../controllers/signController';

const router = express.Router();

// ======================== Sign Routes ===========================================
router.post('/auth/signup', SignController.signUp);
router.post('/auth/signin', SignController.signIn);

export default router;