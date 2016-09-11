const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(PORT);
console.log(`Listening on port ${3090}`);
