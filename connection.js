const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "AUN",
  port: 5432,
  password: "045636290a",
  database: "postgres",
});

module.exports = client;
