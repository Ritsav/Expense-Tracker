const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'expensetrack',
    password: process.env.DB_PASSWORD,
    port: 5432
});

module.exports = pool;