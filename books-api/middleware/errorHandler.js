const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    console.log(err)
    res.status(status).json({
        success: false,
        error: message
    })
}
module.exports = errorHandler;