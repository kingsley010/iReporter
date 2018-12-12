import incident from '../../incident.json';
import users from '../../user.json';
import express from 'express';
import recordController from '../controllers/record';
import authController from '../controllers/auth';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ======================== Auth Route ===========================================
router.post('/auth/signup', authController.signUp);
router.post('/auth/signin', authController.signIn);

// ======================== Red-flag records ===========================================
router.post('/red-flags', recordController.createRecord);
router.get('/red-flags', recordController.fetchAllRecords);
router.get('/red-flags/:id', recordController.fetchOneRecord);
router.patch('/red-flags/:id/location', recordController.editOneLocation);
router.patch('/red-flags/:id/comment', recordController.editOneComment);
router.delete('/red-flags/:id', recordController.removeOneRecord);

export default router;
