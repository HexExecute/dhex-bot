import { Command } from '../Structures/Command'

export default new Command({
  name: 'ping',
  description: 'A simple test command.',
  usage: 'ping',
  permissions: ['ADMINISTRATOR'],
  ephemeral: true,
  aliases: ['test'],
  execute: ({ interaction }) => {
    interaction.editReply('Pong')
  },
})
