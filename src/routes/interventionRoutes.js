import express from 'express';
import Verify from '../middlewares/verify';
import InterventionController from '../controllers/interventionController';

const router = express.Router();

router.post('/interventions', Verify.verifyUser, InterventionController.postRecord);
router.get('/interventions', Verify.verifyUser, InterventionController.fetchAllInterventions);
router.get('/interventions/:id', Verify.verifyUser, InterventionController.getSpecificIntervention);
router.patch('/interventions/:id/location', Verify.verifyUser, InterventionController.updateLocation);
router.patch('/interventions/:id/comment', Verify.verifyUser, InterventionController.updateComment);
router.delete('/interventions/:id', Verify.verifyUser, InterventionController.deleteOneIntervention);
router.patch('/interventions/:id/status', Verify.verifyUser, InterventionController.editStatus);

export default router;