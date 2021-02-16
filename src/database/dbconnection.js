const { Pool } = require('pg');
const config = require("../config/config"); 

const pool = new Pool( config.DATABASE );

module.exports = pool;