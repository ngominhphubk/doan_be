import jwt from 'jsonwebtoken';
const auth = {};
auth.authenticateAdmin = async (req, res, next) => {
    try {
        if (req.headers['x-token']) {
            const token = req.headers['x-token'];
            console.log('token: ', token);
            const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
            req.user = payload;
            if (req.user.Quyen != 0) {
                return res.sendStatus(403);
            }
            return next();
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(200).json({
                code: 401,
                msg: error.message,
            });
        }
        return res.status(200).json({
            code: 500,
            msg: error,
        });
    }
};
auth.authenticateUser = async (req, res, next) => {
    try {
        if (req.headers['x-token']) {
            const token = req.headers['x-token'];
            console.log('token: ', token);
            const payload = await jwt.verify(token, process.env.ACCESS_TOKEN);
            req.user = payload;
            return next();
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                code: 401,
                msg: error.message,
            });
        }
        return res.status(500).json({
            code: 500,
            msg: error,
        });
    }
};
auth.verifyRefreshToken = async (req, res, next) => {
    try {
        if (req.headers['rf-token']) {
            const token = req.headers['rf-token'];
            console.log('token: ', token);
            const payload = await jwt.verify(token, process.env.REFRESH_TOKEN);
            req.user = payload;
            return next();
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                code: 401,
                msg: error.message,
            });
        }
        return res.status(500).json({
            code: 500,
            msg: error,
        });
    }
};

export default auth;
