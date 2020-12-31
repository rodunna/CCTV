const { Client } = require("pg");
const alphanumeric = require(`${process.cwd()}/src/utils/alphanumeric.js`);

module.exports = search = async (props, config) => {
  const client = new Client({
    user: config.database.username,
    host: config.database.host,
    database: config.database.username,
    password: config.database.password,
    port: config.database.port,
  });

  client.connect();

  client.query(
    `SELECT * FROM users WHERE uid=${BigInt(props.author.id)};`,
    (err, res) => {
      client.end();

      if (err) return console.log(err);

      console.log(res);
      props.reply(
        `Result is ... **${res.rows[0].id}**! Your tag is: \`\`${alphanumeric(
          res.rows[0].id
        )}\`\`.`
      );
    }
  );
};
