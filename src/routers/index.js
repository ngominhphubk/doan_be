import express from 'express';
import productRouter from '~/routers/product.router';
const router = express.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API OK',
        product: '/api/product',
    });
});
router.use('/product', productRouter);

export default router;
