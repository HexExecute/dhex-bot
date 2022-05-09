import { Command } from '../Structures/Command'
import { CommandType } from '../Typings/iCommand'

export default new Command({
  name: 'ping',
  description: 'A simple test command.',
  usage: 'ping',
  type: CommandType.Interaction,
  permissions: ['ADMINISTRATOR'],
  execute: ({ interaction }) => {
    interaction.reply({ content: 'Pong!', ephemeral: true })
  },
})
