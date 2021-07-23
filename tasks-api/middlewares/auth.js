const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

console.log('Helloooo')

// Protect routes
exports.protect = async (req, res, next) => {
    console.log('Hello')
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        req.token = token;
    }

    if(!token) {
        return next(new ErrorResponse('Not authorized to access this resource', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);
        return next()
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this resource', 401));
    }
}

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles(includes(req.user.role))) {
            return next(new ErrorResponse(`User role ${role.user.role} is not authorized to access this route`, 403));
        }
        return next();
    }
}