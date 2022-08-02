import express from 'express';
import cartController from '~/controllers/cart.controller';

const router = express.Router();

router.get('/getByUser/:id', cartController.getByUser);
router.post('/addNew/:id/:masp/:soluong', cartController.addNew);
router.delete('/delete/:id/:masp', cartController.delete);
router.put('/update/:id/:masp/:soluong', cartController.update);
export default router;
