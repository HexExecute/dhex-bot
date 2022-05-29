import { MessageEmbed } from 'discord.js'
import GetCommandPermissions from '../Scripts/GetCommandPermissions'
import { Command } from '../Structures/Command'
import { iCommand } from '../Typings/iCommand'

function commandInfo(command: iCommand) {
  let commandInfo: string = `description: ${command.description}\nusage: ${command.usage}`

  if (command.permissions)
    commandInfo += `\npermissions: ${GetCommandPermissions(command)}`

  return commandInfo
}

export default new Command({
  name: 'help',
  description: 'A command to give info on all commands.',
  usage: 'help ?(cmd)',
  ephemeral: true,
  options: [
    {
      name: 'command',
      description: 'command to get help for',
      type: 'STRING',
    },
  ],
  execute: ({ interaction, args, client }) => {
    const commands = client.commands.list

    if (!args.command) {
      const commandArray = Array.from(commands.values())

      const embed: MessageEmbed = new MessageEmbed()
        .setTitle('Commands')
        .setColor('GREY')

      if (client.user)
        embed.setThumbnail(client.user.displayAvatarURL()).setAuthor({
          name: client.user.tag,
          iconURL: client.user.displayAvatarURL(),
        })

      for (const command of commandArray)
        embed.addField(command.name, commandInfo(command))

      return interaction.editReply({ embeds: [embed] })
    }

    const command = commands.get(args.command.toLowerCase())
    const embed: MessageEmbed = new MessageEmbed()

    if (!command)
      return interaction.editReply('Please provide an actual command.')

    embed
      .setTitle(command.name)
      .setDescription(commandInfo(command))
      .setColor('GREY')

    return interaction.editReply({ embeds: [embed] })
  },
})
