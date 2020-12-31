const gfs = require("graceful-fs");

module.exports = message = (message, client, config) => {
  if (!message.content.startsWith(config.usage.prefix))
    return console.log(
      `${message.author.username}#${message.author.discriminator}: ${message.content}`
    );

  let args = message.content.substring(config.usage.prefix.length).split(" ");

  const recursive = async (dir) => {
    gfs.readdir(dir, async (err, files) => {
      if (err) return console.log(err);

      if (files.includes(`${args[0]}.js`)) {
        const command = require(`${dir}/${args[0]}.js`);
        return command(message, config);
      } else {
        files.forEach((file) => {
          gfs.lstat(`${dir}/${file}`, async (e, stat) => {
            if (stat.isDirectory()) return recursive(`${dir}/${file}`);
          });
        });
      }
    });
  };

  recursive(`${process.cwd()}/src/commands/`);
};
