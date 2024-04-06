const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "plexxis-admin",
  database: "plexxis-db",
  password: "plexxis123",
  port: 5432,
});

module.exports = pool;
