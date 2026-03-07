const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'log-service',
    brokers: [process.env.KAFKA_BROKER],

    retry: {
        initialRetryTime: 100,
        retries: 8
    }
});

module.exports = kafka;