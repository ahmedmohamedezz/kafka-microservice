class AppError extends Error {
    constructor (message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;

        // if not true => after deployement error
        this.isOperational = isOperational;

        // attach .stack property
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;