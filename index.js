// index.js
const express = require('express');
const connectMongoDB = require('./connection');
const urlRouter = require('./routes/urlR');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/url', urlRouter);

// Connect MongoDB
connectMongoDB("mongodb://localhost:27017/urlP");

module.exports = app;

