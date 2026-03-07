const logService = require('../../application/logService');

const streamEvent = async (req, res, next) => {
    try {
        const result = await logService.createLogEntry(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const readLogs = async (req, res, next) => {
    try {
        const {userId, page, limit} = req.query;
        const result = await logService.getLogs({userId}, page, limit);
        res.json(result);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    streamEvent,
    readLogs
};