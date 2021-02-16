const { Pool } = require('pg');
const config = require("../config/config"); 

const pool = new Pool( config.DATABASE );

module.exports = pool;
/*
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;*/