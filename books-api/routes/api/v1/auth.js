const { Router } = require('express');
const { loginUser, registerUser } = require('../../../controllers/v1/auth');

const router = Router();

router.route('/login').post(loginUser);

router.route('/register').post(registerUser);


module.exports = router;