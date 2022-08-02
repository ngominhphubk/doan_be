import express from 'express';
import productRouter from '~/routers/product.router';
import userRouter from '~/routers/user.router';
import orderRouter from '~/routers/order.router';
import cartRouter from '~/routers/cart.router';
import dsspController from '~/controllers/dssp.controller';
const router = express.Router();
router.get('/', (req, res) => {
    res.json({
        message: 'API OK',
        product: '/api/product',
        user: 'api/user',
        cart: 'api/cart',
        order: 'api/order',
    });
});
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.get('/dssp/:id', dsspController.getByMadh);

export default router;
