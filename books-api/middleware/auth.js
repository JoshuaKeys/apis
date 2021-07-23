const { verify } = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next) => {
    const authorization = req.get('authorization');
    let token;
    if(authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }

    if(!token){
        return next(new ErrorResponse('Not authorized to access this resource', 403))
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this resource', 403))
    }
}