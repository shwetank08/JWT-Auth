require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const cookieParser = require('cookie-parser');
const user = require('./routes/user');
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/api', user);

module.exports = app;



