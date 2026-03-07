module.exports = (err, req, res, next) => {
    const operational = err.isOperational;

    if (operational) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }

    // crash after deployment, handle it and don't expose stack trace
    console.log(err);
    return res.status(500).json({
        error: 'Something went wrong'
    });
}