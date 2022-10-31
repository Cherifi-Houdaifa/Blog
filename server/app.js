var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require("compression");
var cors = require("cors");
const dotenv = require("dotenv");

dotenv.config()

var app = express();

const apiRouter = require('./routes/index');

// DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// cors config
app.use(cors());

// passportjs configuration
require("./auth/auth");

// middlewares
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
    res.status(500).json(err);
})

module.exports = app;
