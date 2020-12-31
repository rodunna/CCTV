const gfs = require("graceful-fs");

// I wrote this little recursive directory search by hand like a baller, but I cannot use it how I intended 😢.
module.exports = requireDir = async (directory) => {
  const path = `${process.cwd()}/src/${directory}`; // Jerry rigged the fuck out of this, I'll fix it eventually.

  gfs.readdir(`${path}/`, async (err, files) => {
    if (err) return console.log(err); // I could throw this, but why bother?

    files.forEach((file) => {
      gfs.lstat(`${path}/${file}`, (e, stat) => {
        if (e) return console.log(e);

        if (stat.isDirectory()) return requireDir(`${directory}/${file}`); // If the file is a directory, recursively search it using the function.

        if (file.endsWith(".js")) {
          require(`${path}/${file}`);
          return console.log(`${file} has been loaded.`);
        } else {
          return console.log(
            `${file} is not a JavaScript file and has been ignored`
          );
        }
      });
    });
  });
};
