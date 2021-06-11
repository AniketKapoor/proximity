const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
exports.generateAccessToken = (user) => jwt.sign({ userId: user.userId, userType: user.userType, userEmail: user.userEmail }, process.env.TOKEN_SECRET);
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]
    if (token == null)
        return res.errorStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.errorStatus(403)
        req.user = user
        next();
    });
}