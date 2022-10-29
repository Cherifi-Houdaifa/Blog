var express = require('express');
var path = require('path');
var logger = require('morgan');
const dotenv = require("dotenv");

dotenv.config()

var app = express();

const authRouter = require('./routes/auth');

// DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// passportjs configuration
require("./auth/auth");

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json(err);
})

module.exports = app;
