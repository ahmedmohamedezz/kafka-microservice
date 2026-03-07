const kafka = require("../config/kafkaClient");
const UserActivity = require("../domain/entities/UserActivity");

const consumer = kafka.consumer({groupId: 'log-group'});

const connectConsumer = async () => {
    await consumer.connect();

    await consumer.subscribe({topic: process.env.KAFKA_TOPIC})

    console.log('Consumer Connected and Subscribed');

    await consumer.run({
        eachMessage: async ({message}) => {
            const payload = message.value.toString();

            try {
                const logData = JSON.parse(payload);

                // process data & save to db
                await UserActivity.create(logData);
                console.log('Consumer: saved log to DB');
            } catch (error) {
                throw error;
            }
        }
    })
}

module.exports = {connectConsumer};