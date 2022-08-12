import express from 'express';
import userController from '~/controllers/user.controller';

const router = express.Router();
router.post('/signUp', userController.signUp);
router.post('/login', userController.logIn);
router.get('/allUser', userController.getAllUser);
router.get('/:id', userController.getById);
router.get('/s/:info', userController.getByInfo);
router.delete('/delete/:id', userController.delete);
router.put('/updateInfo/:id', userController.updateInfo);
router.put('/updateQuyen/:id', userController.updateQuyen);
router.put('/updatePasswd/:id', userController.updatePasswd);

export default router;
