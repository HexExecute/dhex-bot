import { Command } from '../Structures/Command'
import { ban } from '../Scripts/ban'
import { MessageEmbed, User } from 'discord.js'

import ms from 'ms'

export default new Command({
  name: 'ban',
  description: 'A command to ban members.',
  usage: 'ban !(member) ?(duration)',
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'member',
      description: 'member to ban',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'reason for ban',
      type: 'STRING',
      required: true,
    },
    {
      name: 'duration',
      description: 'duration of ban',
      type: 'STRING',
      required: false,
    },
  ],
  execute: async ({ interaction, args, client, author }) => {
    const targetMember = await client.guild.members.fetch(args.member)

    if (!targetMember)
      return interaction.editReply('That member is not in the server.')
    if (!targetMember.bannable)
      return interaction.editReply(`Sorry, you can't ban that person!`)

    const target: User = await client.users.fetch(args.member)
    if (args.duration)
      if (ms(args.duration))
        await ban(author, target, args.reason, args.duration)
      else return interaction.editReply('Please provide a valid duration.')
    else await ban(author, target, args.reason, args.duration)

    const embed: MessageEmbed = new MessageEmbed()
      .setTitle('Ban')
      .setDescription(`<@${author.id}> has banned <@${args.member}>`)
      .setThumbnail(target.displayAvatarURL())
      .setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL(),
      })
      .addField('Reason', args.reason)
      .setFooter({
        text: author.user.tag,
        iconURL: author.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor('RED')

    if (args.duration) {
      const date = new Date(Date.now() + ms(args.duration))
      embed.addField(
        'Expires On',
        date.toLocaleDateString('en-US', { timeZone: 'America/New_York' }) +
          ' ' +
          date.toLocaleTimeString('en-US', { timeZone: 'America/New_York' }) +
          ' (EST)'
      )
    }

    interaction.editReply({
      embeds: [embed],
    })
  },
})
