const fs = require('fs');
const {Kafka, logLevel} = require('kafkajs');

const kafka = new Kafka({
    // logLevel: logLevel.DEBUG,
    clientId: 'log-service',
    brokers: [process.env.KAFKA_BROKER],
    ssl: {
        ca: [fs.readFileSync('./kafka_secrets/ca.pem', 'utf-8')]
    },
    sasl: {
        mechanism: process.env.KAFKA_MECHANISM,
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
    },
    retry: {
        initialRetryTime: 100,
        retries: 3
    },
    connectionTimeout: 10000,
    authenticationTimeout: 10000,
});

module.exports = kafka;