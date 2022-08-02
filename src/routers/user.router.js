import express from 'express';
import userController from '~/controllers/user.controller';

const router = express.Router();
router.post('/signUp', userController.signUp);

export default router;
