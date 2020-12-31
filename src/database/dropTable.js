const { Client } = require("pg");
const config = require("../../config.json");

const client = new Client({
  user: config.database.username,
  host: config.database.host,
  database: config.database.username,
  password: config.database.password,
  port: config.database.port,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
