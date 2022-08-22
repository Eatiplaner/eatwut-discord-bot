const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require("discord.js")
const shell = require('shelljs');
const { NotifyDevopsEmbed } = require('../../Components/Embed')

module.exports = {
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

    const StartButton = (disable = false) => {
      const baseButton = new ButtonBuilder()
        .setCustomId('aws-ec2-start')
        .setLabel('Start All Servers')
        .setStyle(ButtonStyle.Success)

      if (disable) {
        baseButton.setDisabled()
      }
      return baseButton;
    }

    const StopButton = (disable = false) => {
      const baseButton = new ButtonBuilder()
        .setCustomId('aws-ec2-stop')
        .setLabel('Stop All Servers')
        .setStyle(ButtonStyle.Danger)

      if (disable) {
        baseButton.setDisabled()
      }

      return baseButton;
    }

    const rowButtons = (options = { disableStart: false, disableStop: false }) => new ActionRowBuilder().addComponents(StartButton(options.disableStart), StopButton(options.disableStop))

    interaction.reply({ components: [rowButtons()] });

    interaction.channel.awaitMessageComponent().then(async (i) => {
      interaction.editReply({ content: "😈 ***This command has been triggered, please create a new command.***", components: [rowButtons({ disableStart: true, disableStop: true })] });
      if (i.customId === 'aws-ec2-start') {
        await i.deferReply();

        const result = shell.exec('./scripts/aws/start_all_servers.sh')

        if (result.code !== 0) {
          console.error(result.stderr)
          await i.editReply({ embeds: [NotifyDevopsEmbed] })
          return;
        }

        await i.editReply({
          components: [], embeds: [new EmbedBuilder()
            .setColor(Colors.Green)
            .setTitle('All Servers Running')
            .setDescription('Sent trigger command to aws ec2 instances')
          ], isInteraction: true
        });
      }

      if (i.customId === 'aws-ec2-stop') {
        await i.deferReply();

        const result = shell.exec('./scripts/aws/stop_all_servers.sh')

        if (result.code !== 0) {
          console.error(result.stderr)
          await i.editReply({ embeds: [NotifyDevopsEmbed] })
          return;
        }

        await i.editReply({
          components: [], embeds: [new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle('All Servers Stopped')
            .setDescription('Sent trigger command to aws ec2 instances')], isInteraction: true
        });
      }
    });
  },
}
