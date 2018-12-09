import incident from '../../incident.json';
import users from '../../user.json';
import express from 'express';
import recordController from '../controllers/record';
import pg from 'pg';
import dotenv from 'dotenv';
// Importing Database Details
import pool from '../models/db';

dotenv.config();

const router = express.Router();

// ======================== Red-flag records ===========================================
router.post('/red-flags', recordController.createRecord);
router.get('/red-flags', recordController.fetchAllRecords);
router.get('/red-flags/:id', recordController.fetchOneRecord);+
router.patch('/red-flags/:id/location', recordController.editOneLocation);
router.patch('/red-flags/:id/comment', recordController.editOneComment);
router.delete('/red-flags/:id', recordController.removeOneRecord);

export default router;
