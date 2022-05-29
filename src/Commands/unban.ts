import { Command } from '../Structures/Command'
import { unban } from '../Scripts/ban'
import { GuildMember, MessageEmbed, User } from 'discord.js'

export default new Command({
  name: 'unban',
  description: 'A command to unban members.',
  usage: 'unban !(member)',
  permissions: ['BAN_MEMBERS'],
  options: [
    {
      name: 'member',
      description: 'member to unban',
      type: 'USER',
      required: true,
    },
  ],
  execute: async ({ interaction, args, client, author }) => {
    const target: User = await client.users.fetch(args.member)
    await unban(target)

    interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setTitle('Un-Ban')
          .setDescription(`<@${author.id}> has unbanned <@${args.member}>`)
          .setThumbnail(target.displayAvatarURL())
          .setAuthor({
            name: target.tag,
            iconURL: target.displayAvatarURL(),
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
