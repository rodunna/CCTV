module.exports = ready = (props, client, config) => {
  console.log(
    `${client.user.username}#${client.user.discriminator} has logged on at ... ${client.readyAt}!`
  );
};
