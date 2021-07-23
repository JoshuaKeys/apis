const express = require('express');
const { protect } = require('../middlewares/auth');

const {getTasks, createTask} = require('./../controllers/tasks');

const router = express.Router();


router.route('/').get(protect, getTasks).post(createTask)

module.exports = router;