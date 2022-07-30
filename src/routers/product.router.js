import express from 'express';
import productController from '~/controllers/product.controller';
import handleUpload from '~/middleware/loadImg.middleware';
const router = express.Router();
// const { authenticateAdmin } = require('../middlewares/auth.js');
router.put('/:masp', productController.updateProduct);
router.delete('/:masp', productController.deleteProductWithId);
router.post('/', handleUpload, productController.insertProduct);
router.get('/', productController.getAllProduct);
router.get('/type', productController.getAllProductType);
export default router;