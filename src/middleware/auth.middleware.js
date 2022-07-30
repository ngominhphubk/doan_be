import jwt from 'jsonwebtoken';
const auth = {};
auth.authenticateAdmin = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        if (user.Quyen != 0) return res.sendStatus(403);
        next();
    });
};
auth.authenticateUser = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        const { exp, iat, ...userInfo } = user;
        req.user = userInfo;
        next();
    });
};

export default auth;
