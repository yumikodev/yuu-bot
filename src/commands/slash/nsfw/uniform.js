const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uniform")
    .setDescription("🔞 Genera una imagen de uniform"),
  async execute(client, int) {
    if (!int.channel.nsfw) {
      return await int.reply({
        content: `🔞 **${int.user.username}**, este canal no es **NSFW**`,
      });
    }

    fetch("https://akaneko-api.herokuapp.com/api/uniform")
      .then((res) => res.json())
      .then(async (data) => {
        const embed = new MessageEmbed()
          .setTitle("<:hornygirl:966070553268064378> Uniform 🔥")
          .setImage(data.url)
          .setColor(client.config.hexColor);

        await int.reply({ embeds: [embed] });
      })
      .catch(async (err) => {
        console.log(err);
        await int.reply({ content: err.message, ephemeral: true });
      });
  },
};
