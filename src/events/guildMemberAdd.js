const { Client } = require("pg");
const alphanumeric = require(`${process.cwd()}/src/utils/alphanumeric.js`);
const config = require("../../config.json");

module.exports = guildMemberAdd = (guildMember) => {
  const client = new Client({
    user: config.database.username,
    host: config.database.host,
    database: config.database.username,
    password: config.database.password,
    port: config.database.port,
  });

  client.connect();

  client.query(
    `INSERT INTO users(uid) VALUES (${BigInt(guildMember.user.id)});`,
    (err, res) => {
      if (err) {
        client.end();
        return console.log(err);
      }

      console.log(
        `${guildMember.user.username} has been added to the database.`
      );

      client.query(
        `SELECT * FROM users WHERE uid=${BigInt(guildMember.user.id)};`,
        (err, res) => {
          client.end();
          if (err) return console.log(err);

          guildMember.setNickname(alphanumeric(res.rows[0].id));
          return console.log(
            `${
              guildMember.user.username
            } has been given the tag: ${alphanumeric(res.rows[0].id)}`
          );
        }
      );
    }
  );
};
