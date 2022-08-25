import express from 'express';
import auth from '~/middleware/auth.middleware';
import util from '~/util';
const router = express.Router();

router.get('/refreshToken', auth.verifyRefreshToken, async (req, res) => {
    const data = req.user;
    const accessToken = util.generateToken(data);
    return res.status(200).json({
        status: 'success',
        element: {
            accessToken: accessToken,
        },
    });
});

export default router;
