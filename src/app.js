const Discord = require("discord.js"),
  config = require("../config.json"),
  evtHandler = require("./utils/eventHandler.js"),
  client = new Discord.Client({
    presence: {
      status: "idle",
      activity: {
        type: "WATCHING",
        name: "rodunna write me!",
      },
    },
  });

evtHandler("events", client, config);

client
  .on("error", (err) =>
    console.log(
      "An unexpected (or maybe expected?) error has occurred ... ",
      err
    )
  )
  .on("rateLimit", (rateLimitInfo) =>
    console.log(
      "We are being rate limited for some fucking reason, read it here first ... ",
      JSON.stringify(rateLimitInfo)
    )
  )
  .login(config.token);
