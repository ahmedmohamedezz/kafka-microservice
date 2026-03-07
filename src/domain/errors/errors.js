const AppError = require("../../common/error/AppError");

const InsufficientUserActivityDataError = new AppError("Insufficient data for a user log", 400);

module.exports = {
    InsufficientUserActivityDataError
}