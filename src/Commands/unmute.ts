import { Command } from '../Structures/Command'
import { unmute } from '../Scripts/mute'
import { GuildMember, MessageEmbed } from 'discord.js'

export default new Command({
  name: 'unmute',
  description: 'A command to unmute members.',
  usage: 'unmute !(member)',
  permissions: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'member',
      description: 'member to mute',
      type: 'USER',
      required: true,
    },
  ],
  execute: async ({ interaction, args, client, author }) => {
    const target: GuildMember = await client.guild.members.fetch(args.member)
    await unmute(target)

    interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setTitle('Mute')
          .setDescription(`<@${author.id}> has unmuted <@${args.member}>`)
          .setThumbnail(target.user.displayAvatarURL())
          .setAuthor({
            name: target.user.tag,
            iconURL: target.user.displayAvatarURL(),
          })
          .setFooter({
            text: author.user.tag,
            iconURL: author.displayAvatarURL(),
          })
          .setTimestamp()
          .setColor('GREEN'),
      ],
    })
  },
})
