const settings = require('../settings.json');

function getGuildConfig(client, guild, callback) {
  client.sqlite.get(`SELECT * FROM guilds WHERE id = "${guild.id}"`, callback)
}

module.exports = message => {

  getGuildConfig(message.client, message.guild, (err, row) => {
    if(row) {
      let client = message.client;
      if (message.author.bot) return;
      if (!message.content.startsWith(row.prefix)) return;
      let command = message.content.split(' ')[0].slice(row.prefix.length);
      let params = message.content.split(' ').slice(1);
      let perms = client.elevation(message);
      let cmd;
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
      }
      if (cmd) {
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
      }  
    }
  })

};
