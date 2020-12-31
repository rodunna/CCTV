const { Client } = require("pg");

module.exports = drop = (props, config) => {
  if (props.author.id != config.information.did)
    return props.reply("🔥 You are not authorized to use this command!");

  const client = new Client({
    user: config.database.username,
    host: config.database.host,
    database: config.database.username,
    password: config.database.password,
    port: config.database.port,
  });

  client.connect();

  client.query(`DROP TABLE users`, async (err, res) => {
    client.end();

    if (err) return console.log(err);

    props.reply("⚗ The table has been **DROPPED**.");
  });
};
