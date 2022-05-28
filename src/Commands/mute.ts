import { Command } from '../Structures/Command'
import { mute } from '../Scripts/mute'
import { GuildMember, MessageEmbed } from 'discord.js'

import ms from 'ms'

export default new Command({
  name: 'mute',
  description: 'A command to mute members.',
  usage: 'mute !(member) ?(duration)',
  permissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'member',
      description: 'member to mute',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'reason for mute',
      type: 'STRING',
      required: true,
    },
    {
      name: 'duration',
      description: 'duration of mute',
      type: 'STRING',
      required: false,
    },
  ],
  execute: async ({ interaction, args, client, author }) => {
    const target: GuildMember = await client.guild.members.fetch(args.member)
    if (args.duration)
      if (ms(args.duration))
        await mute(interaction, target, args.reason, args.duration)
      else return interaction.editReply('Please provide a valid duration.')
    else await mute(interaction, target, args.reason, args.duration)

    const embed: MessageEmbed = new MessageEmbed()
      .setTitle('Mute')
      .setDescription(`<@${author.id}> has muted <@${args.member}>`)
      .setThumbnail(target.user.displayAvatarURL())
      .setAuthor({
        name: target.user.tag,
        iconURL: target.user.displayAvatarURL(),
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
