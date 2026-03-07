module.exports = (err, req, res, next) => {
    const operational = err.isOperational;

    if (operational) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }

    // crash after deployment, handle it and don't expose stack trace
    // in real app, this is to be logged to a monitoring/logging
    // service to investigate the crash
    console.log(err);
    return res.status(500).json({
        error: 'Something went wrong'
    });
}