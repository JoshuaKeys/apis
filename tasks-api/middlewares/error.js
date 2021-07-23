const errorHandler = (err, req, res, next) => {
    if(err.code === 11000) {
        // Validation Error

        console.log(err)
       err.statusCode = 400;
    } else {
        console.log('Hellllooo')
        console.log(err.errors)
    }
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
}

module.exports = errorHandler;