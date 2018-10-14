require('dotenv').config();
const config = require('./config.js');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');

const routes = require('./routes.js');

const server = () => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors);
    app.use('/', routes());

    return app;
};

module.exports = server;