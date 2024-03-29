const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("./config/config");
const chalk = require("chalk");
const { join } = require("node:path");

const commands = [];

const commandFiles = fs.readdirSync(join(__dirname, "./commands/slash"));

for (const folders of commandFiles) {
  const folder = fs
    .readdirSync(join(__dirname, `./commands/slash/${folders}`))
    .filter((file) => file.endsWith(".js"));
  for (const file of folder) {
    const command = require(`./commands/slash/${folders}/${file}`);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: 9 }).setToken(config.token);

(async () => {
  try {
    console.log(
      chalk.yellow("⁘ » Started refreshing application (/) commands...")
    );

    await rest.put(
      // Routes.applicationGuildCommands(config.devClientId, config.guildId), // Slash commands on a server
      Routes.applicationCommands(config.clientId), // Global slash commands
      {
        body: commands,
      }
    );

    console.log(
      chalk.green("✓ » Successfully reloaded application (/) commands.")
    );
  } catch (err) {
    console.error(err);
  }
})();
