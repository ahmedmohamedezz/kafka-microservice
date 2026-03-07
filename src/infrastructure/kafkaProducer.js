const kafka = require("../config/kafkaClient");

const producer = kafka.producer();

const connectProducer = async () => {
    await producer.connect();
    console.log('Producer Connected');
}

const sendLog = async (data) => {
    await producer.send({
        topic: process.env.KAFKA_TOPIC,
        messages: [{value: JSON.stringify(data)}],
    });

    console.log('Producer: New log sent to queue');
}

module.exports = {connectProducer, sendLog};