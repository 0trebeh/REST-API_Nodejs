const config = require("../config/config"); 


const { Pool } = require('pg');

const pool = new Pool({
  connectionString: config.DBURI,
  max: 20,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = pool;