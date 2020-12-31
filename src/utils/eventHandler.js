const gfs = require("graceful-fs");

module.exports = evtHandler = (directory, client, config) => {
  const path = `${process.cwd()}/src/${directory}`; // Jerry rigged the fuck out of this, I'll fix it eventually.

  gfs.readdir(`${path}/`, async (err, files) => {
    if (err) return console.log(err); // I could throw this, but why bother?

    files.forEach((file) => {
      gfs.lstat(`${path}/${file}`, (e, stat) => {
        if (e) return console.log(e);

        if (stat.isDirectory()) return requireDir(`${directory}/${file}`); // If the file is a directory, recursively search it using the function.

        if (file.endsWith(".js")) {
          const evt = require(`${path}/${file}`);

          client.on(file.split(".")[0], (props) => {
            evt(props, client, config);
          });

          return console.log(`${file.split(".")[0]} has been loaded.`);
        } else {
          return console.log(
            `${file} is not a JavaScript file and has been ignored`
          );
        }
      });
    });
  });
};
