const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

//inicializaciones
require('./database/dbconnection'); 
const server = express();

//Middlewares
server.use(cors());
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//rutas
server.use('/api', require('./routes/users'));

module.exports = server;