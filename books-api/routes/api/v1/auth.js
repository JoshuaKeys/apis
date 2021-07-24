const { Router } = require('express');
const { loginUser, registerUser, forgotPassword, resetPassword } = require('../../../controllers/v1/auth');

const router = Router();

router.route('/login').post(loginUser);

router.route('/register').post(registerUser);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:token').put(resetPassword)

module.exports = router;