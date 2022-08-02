import express from 'express';
import orderController from '~/controllers/order.controller';
const router = express.Router();

router.post('/addNew', orderController.addNew);
router.get('/getAll', orderController.getAll);
router.get('/getById/:id', orderController.getById);
router.get('/getByMakh/:id', orderController.getByMaKh);
router.get('/getByState/:state', orderController.getByState);
router.put('/updateState/:id', orderController.updateState);
router.put('/huydon/:id', orderController.huydon);
router.put('/danhan/:id', orderController.danhan);
export default router;
