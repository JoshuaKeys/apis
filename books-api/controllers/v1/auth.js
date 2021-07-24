const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// @route       /api/v1/auth/register
// @desc        Registers a user

const asyncHandler = require("../../middleware/asyncHandler");
const  ErrorResponse  = require('../../utils/errorResponse');
const sendEmail = require('../../utils/sendEmail');

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
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    
    const user = await User.findOne({email}).select('+password');
    if(!user) {
        return next(new ErrorResponse('The email you provided isn\'nt registered', 400));
    }

    const token = await user.getResetPasswordToken();

    await user.save();

    const emailText = `
    <h1>Password Reset</h1>
    <p>
        You are receiving this email because you or someone has
        requested to change your password. To change your password
        please 
        <a href="${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${token}">click here</a>
    </p>`
    try {
        await sendEmail({
            to: email,
            subject: 'Password reset',
            content: emailText
        })
        res.status(200).json({
            success: true,
            data: 'Email Sent'
        })
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        next(new ErrorResponse('Email could not be sent', 500));
    }
})

// @route   /api/v1/auth/resetpassword/:token
// @desc    Resets ones password by a special token
// @method  PUT
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next)=> {
    const {password} = req.body;
    const token = req.params.token;

    if(!token) {
        return next(new ErrorResponse('Invalid token sent', 400));
    }
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken
    }).select('+password')

    if(!user) {
        return next(new ErrorResponse('Invalid token sent', 400));
    }

    // Check if token has expired
    const isExpired = Date.now() > user.resetPasswordExpire;
    if(isExpired) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return next(new ErrorResponse('Expired token', 400));
    }
    user.password = password;
    await user.save()

    const jwtToken = user.getJwtSignedToken();

    res.status(200).json({
        success: true,
        token: jwtToken
    })

})