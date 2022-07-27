const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require("discord.js")

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
    const row = (options = { disableStart: false, disableStop: false }) => new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('aws-ec2-start')
          .setLabel('Start All Servers')
          .setStyle(ButtonStyle.Success)
          .setDisabled(options.disableStart),
        new ButtonBuilder()
          .setCustomId('aws-ec2-stop')
          .setLabel('Stop All Servers')
          .setStyle(ButtonStyle.Danger)
          .setDisabled(options.disableStop),
      )

    interaction.reply({ components: [row()] });

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on('collect', async i => {
      if (i.customId === 'aws-ec2-start') {
        const embed = new EmbedBuilder()
          .setColor(Colors.Green)
          .setTitle('All Servers Running')
          .setDescription('Sent trigger command to aws ec2 instances');

        await i.deferReply();
        await i.editReply({ components: [row({ disableStop: false, disableStart: true })], embeds: [embed], isInteraction: true });
      }

      if (i.customId === 'aws-ec2-stop') {
        const embed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle('All Servers Stopped')
          .setDescription('Sent trigger command to aws ec2 instances');

        await i.deferReply();
        await i.editReply({ components: [row({ disableStop: true, disableStart: false })], embeds: [embed], isInteraction: true });
      }
    });

  },
}
