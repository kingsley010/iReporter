import express from 'express';
import recordController from '../controllers/record';
import incident from '../../incident.json';
import users from '../../user.json';

const router = express.Router();

router.post('/red-flags', recordController.createRecord);
router.get('/red-flags', recordController.fetchAllRecords);
router.get('/red-flags/:id', recordController.fetchOneRecord);
router.patch('/red-flags/:id', recordController.editOneRecord);

export default router;
