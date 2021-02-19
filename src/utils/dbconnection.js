const config = require("../config/config"); 

const { Client } = require('pg');

const client = new Client({
  connectionString: config.DBURI,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;