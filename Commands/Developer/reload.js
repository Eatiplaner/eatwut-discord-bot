const { EmbedBuilder } = require('.pnpm/@discordjs+builders@1.0.0/node_modules/@discordjs/builders')
const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits, Colors } = require('discord.js')

const { loadCommands } = require('../../Handlers/commandHandler')
const { loadEvents } = require('../../Handlers/eventHandler')

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your events/commands .")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName("events").setDescription("Reload your events"))
    .addSubcommand((options) => options.setName("commands").setDescription("Reload your commands")),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const sub = interaction.options.getSubcommand()

    switch (sub) {
      case "events":
        loadEvents(client);

        interaction.reply({
          components: [], embeds: [new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle('Reloaded the events')
          ]
        })

        break;
      case "commands":
        interaction.reply({
          components: [], embeds: [new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle('Reloaded the commands')
          ]
        })


        break;
    }
  },
}
