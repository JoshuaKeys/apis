const { Router } = require("express");
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/auth");

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/forgotpassword').post(forgotPassword)

router.route('/resetpassword/:resettoken').put(resetPassword);

module.exports = router;