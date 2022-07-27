const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require("discord.js")

const wait = require('node:timers/promises').setTimeout;

module.exports = {
  developer: true,
  name: 'aws-ec2',
  data: new SlashCommandBuilder()
    .setName("aws-ec2")
    .setDescription("EC2 Servers")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('aws-ec2-start')
          .setLabel('Start All Servers')
          .setStyle(ButtonStyle.Success),
      ).addComponents(
        new ButtonBuilder()
          .setCustomId('aws-ec2-stop')
          .setLabel('Stop All Servers')
          .setStyle(ButtonStyle.Danger)
      );

    interaction.reply({ components: [row] });

    const start_filter = i => i.customId === 'aws-ec2-start'
    const stop_filter = i => i.customId === 'aws-ec2-stop'

    const start_collector = interaction.channel.createMessageComponentCollector({ filter: start_filter });
    const stop_collector = interaction.channel.createMessageComponentCollector({ filter: stop_filter });

    start_collector.on('collect', async i => {
      const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle('All Servers Running')
        .setDescription('Sent trigger command to aws ec2 instances');

      await i.deferUpdate();
      await i.editReply({ components: [], embeds: [embed], fetchReply: true });
    });

    stop_collector.on('collect', async i => {
      const embed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle('All Servers Stopping')
        .setDescription('Sent trigger command to aws ec2 instances');

      await i.deferUpdate();
      await i.editReply({ components: [], embeds: [embed], fetchReply: true });
    });
  },
}
