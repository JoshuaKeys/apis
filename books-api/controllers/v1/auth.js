const User = require('../../models/User');
const bcrypt = require('bcryptjs');


// @route       /api/v1/auth/register
// @desc        Registers a user

const asyncHandler = require("../../middleware/asyncHandler");
const  ErrorResponse  = require('../../utils/errorResponse');

// @access      Public
exports.registerUser = asyncHandler(async(req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if email is already registered
    const userExists = await User.findOne({email});

    if(userExists) {
        return next(new ErrorResponse('This email has already been registered', 400));
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })

    const token = user.getJwtSignedToken();

    res.status(200).json({
        success: true,
        token
    })
});
// @route       /api/v1/auth/login
// @desc        Logs a user in
// @access      Public
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({email}).select('+password');
    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 400))
    }

    // Even if email exists, check if the passwords match
    const isMatchedPassword = await user.isMatch(password);
    if(!isMatchedPassword) {
        return next(new ErrorResponse('Invalid credentials', 400))
    }

    const token = await user.getJwtSignedToken();

    res.status(200).json({
        success: true,
        token
    })
});

// @route       /api/v1/auth/forgotpassword
// @desc        Sends an email to the user to reset his/her password
// @access      Public
exports.forgotPassword = (req, res, next) => {
    const { email } = req.body;
    
    const user = await User.findOne({email});
    if(!user) {
        return next(new ErrorResponse('The email you provided isn\'nt registered', 400));
    }
}