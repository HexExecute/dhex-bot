import { client } from '../main'
import { Event } from '../Structures/Event'
import { CommandOptions } from '../Typings/iCommand'
import { CommandInteraction } from 'discord.js'

export default new Event('interactionCreate', interaction => {
  if (!interaction.isCommand()) return
  const inter: CommandInteraction = interaction
  const args = inter.options.data

  client.commands.runCommand(inter.commandName, {
    interaction: inter,
    args: args,
  } as CommandOptions)
})
