const asyncHandler = require('../middlewares/async');
const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all tasks
// @route   Get /api/v1/bootcamps
// @access Public
exports.getTasks = (req, res, next) => {
    res.send("Hello World");
}

exports.createTask = asyncHandler(async (req, res, next) => {
    const task = await Task.create(req.body);

    res.status(201).json({
        success: true,
        data: task
    })

});