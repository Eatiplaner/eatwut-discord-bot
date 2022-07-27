const { EmbedBuilder } = require(".pnpm/@discordjs+builders@1.0.0/node_modules/@discordjs/builders")
const { Colors } = require("discord.js")

NotifyDevopsEmbed = new EmbedBuilder()
  .setColor(Colors.Red)
  .setTitle('Something wrong with scripts')
  .setDescription("Please notify devops members")

module.exports = { NotifyDevopsEmbed }

