import express from 'express';
const router = express.Router();


import incident from '../../incident.json';
import users from '../../user.json';
import recordController from '../controllers/record';

router.post('/red-flags', recordController.createRecord);

export default router;
