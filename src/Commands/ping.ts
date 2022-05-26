import { Command } from '../Structures/Command'

export default new Command({
  name: 'ping',
  description: 'A simple test command.',
  usage: 'ping',
  permissions: ['ADMINISTRATOR'],
  execute: ({ interaction }) => {
    interaction.reply({ content: 'Pong!', ephemeral: true })
  },
})
