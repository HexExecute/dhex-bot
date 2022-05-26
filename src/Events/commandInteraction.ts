import { client } from '../main'
import { Event } from '../Structures/Event'
import { CommandOptions, iCommand } from '../Typings/iCommand'
import ArgumentFormatter from '../Scripts/ArgumentFormatter'
import { CommandInteraction, CommandInteractionOption } from 'discord.js'

function capitalizeTheFirstLetterOfEachWord(words: string): string {
  let separateWord = words.toLowerCase().split(' ')
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1)
  }
  return separateWord.join(' ')
}

function defer(inter: CommandInteraction, command: iCommand) {
  if (command.ephemeral) return inter.deferReply({ ephemeral: true })
  else return inter.deferReply()
}

export default new Event('interactionCreate', interaction => {
  if (!interaction.isCommand()) return
  const inter: CommandInteraction = interaction
  const args: readonly CommandInteractionOption[] = inter.options.data

  const command: iCommand = client.commands.getCommand(inter.commandName)
  defer(inter, command).then(() => {
    if (command.permissions)
      if (!inter.memberPermissions?.has(command.permissions))
        return inter.editReply(`Sorry, you don't have permissions to run that command!\n\nRequired: ${capitalizeTheFirstLetterOfEachWord(
          (command.permissions as string[]).join(', ').replace('_', ' ')
        )}
            `)

    command.execute({
      interaction: inter,
      args: ArgumentFormatter(args),
      client: client,
    } as CommandOptions)
  })
})
