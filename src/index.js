// src/index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const {connectProducer} = require('./infrastructure/kafkaProducer');
const {connectConsumer} = require('./infrastructure/kafkaConsumer');
const routes = require('./interfaces/routes');
const errorHandler = require('./common/error/errorHandler');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MODE = process.env.APP_MODE || 'API';

const startApp = async () => {
    await connectDB();

    if (MODE === 'API') {
        // --- API MODE (Producer) ---
        await connectProducer();
        app.use('/api', routes);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`API Server running on port ${PORT}`);
        });

    } else if (MODE === 'WORKER') {
        await connectConsumer();
    } else {
        process.exit(1);
    }
};

startApp();