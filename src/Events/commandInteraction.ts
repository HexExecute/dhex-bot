import { client } from '../main'
import { Event } from '../Structures/Event'
import { CommandOptions, iCommand } from '../Typings/iCommand'
import ArgumentFormatter from '../Scripts/ArgumentFormatter'
import GetCommandPermissions from '../Scripts/GetCommandPermissions'
import {
  CommandInteraction,
  CommandInteractionOption,
  GuildMember,
  User,
} from 'discord.js'

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

export default new Event('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  const inter: CommandInteraction = interaction
  const args: readonly CommandInteractionOption[] = inter.options.data

  const command: iCommand = client.commands.getCommand(inter.commandName)
  await defer(inter, command).then(async () => {
    if (command.permissions)
      if (!inter.memberPermissions?.has(command.permissions))
        return inter.editReply(`Sorry, you don't have permissions to run that command!\n\nRequired: ${GetCommandPermissions(
          command
        )}
            `)
    const authorUser = inter.member?.user as User
    const author: GuildMember = await client.guild.members.fetch(authorUser.id)

    command.execute({
      interaction: inter,
      args: ArgumentFormatter(args),
      client: client,
      author: author,
    } as CommandOptions)
  })
})
