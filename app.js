const express = require('express');
const morgan = require('morgan');

const touRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1- MW
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log('Hi from MW👦👌');
    next();
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// 3- Routes

app.use('/api/v1/tours', touRouter);
app.use('/api/v1/users', userRouter);

// 4- Start server


module.exports = app;