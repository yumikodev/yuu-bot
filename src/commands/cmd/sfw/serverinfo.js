const { MessageEmbed } = require("discord.js");
const { format } = require("yutil.js");

module.exports = {
  name: "serverinfo",
  alias: ["sinfo"],

  execute(client, message, args) {
    const embed = new MessageEmbed()

      .setTitle("📢Informacion de el servidor")
      .setDescription(
        `**Descripción**: ${
          message.guild.description === null
            ? "Ninguna"
            : message.guild.description
        }`
      )
      .setThumbnail(message.guild.iconURL())
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setColor(client.config.hexColor)
      .addField("🆔ID:", message.guild.id)
      .addField(
        "✨Dia de creación",
        `${format(message.guild.joinedAt).date}, a las ${format(
          message.guild.joinedAt
        ).hour}`
      )
      .addField("👑Dueño(a)", `<@${message.guild.ownerId}>`)
      .addField("👤Miembros:", `${message.guild.memberCount}`, true)
      .addField(
        "🤖Bots:",
        `${message.guild.members.cache.filter((m) => m.user.bot).size}`
      )
      .addField("🙃Emojis", `${message.guild.emojis.cache.size}`)
      .addField(
        "⚜Boost:",
        `${message.guild.premiumSubscriptionCount.toString()}`
      )
      .addField(
        "✅Nivel de verificación:",
        `${message.guild.verificationLevel}`
      )
      .addField("🏹Roles:", `${message.guild.roles.cache.size}`, true);

    message.channel.send({ embeds: [embed] });
  },
};
