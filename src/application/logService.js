// src/application/logService.js
const {sendLog} = require('../infrastructure/kafkaProducer');
const UserActivity = require('../domain/entities/UserActivity');
const {InsufficientUserActivityDataError} = require("../domain/errors/errors");

// 1. Send data to Kafka (Producer)
const createLogEntry = async (data) => {

    if (!data.userId || !data.action || !data.timestamp) {
        throw InsufficientUserActivityDataError;
    }

    const logObject = {
        userId: data.userId,
        action: data.action,
        timestamp: data.timestamp,
        metadata: data.metadata,
    }

    // send to kafka topic
    try {
        await sendLog(logObject);
        return {success: true, message: 'Log queued for processing'};
    } catch (error) {
        throw error;
    }
};

const getLogs = async (filters, page = 1, limit = 10) => {
    const query = {};
    if (filters.userId) query.userId = filters.userId;

    const logs = await UserActivity.find(query)
        .sort({timestamp: -1})
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await UserActivity.countDocuments(query);

    return {
        data: logs,
        pagination: {
            total,
            page: page,
            limit: limit,
            pages: Math.ceil(total / limit)
        }
    };
};

module.exports = {createLogEntry, getLogs};