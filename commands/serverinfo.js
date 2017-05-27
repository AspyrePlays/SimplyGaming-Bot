exports.run = (client, message) => {
  message.channel.send('serverinfo')
    .then(msg => {
      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'server/status')
        .addField('User:', `${uptime}`)
        .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Reason:', `${reason}`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'serverinfo',
  description: 'Look at the servers infomation',
  usage: 'serverinfo'
};