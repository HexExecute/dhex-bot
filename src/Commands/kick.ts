import { GuildMember, MessageEmbed } from 'discord.js'
import { Command } from '../Structures/Command'

export default new Command({
  name: 'kick',
  description: 'A command to kick members.',
  usage: 'kick !(member) !(reason)',
  permissions: ['KICK_MEMBERS'],
  options: [
    {
      name: 'member',
      description: 'member to kick',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'reason for kick',
      type: 'STRING',
      required: true,
    },
  ],
  execute: async ({ interaction, args, client, author }) => {
    const target: GuildMember = await client.guild.members.fetch(args.member)

    if (!target.kickable) {
      interaction.editReply(`Sorry, but you can't kick that person!`)
      return setTimeout(() => interaction.deleteReply(), 5000)
    }

    target.kick(args.reason).then(() =>
      interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setTitle('Kick')
            .setDescription(`<@${author.id}> has kicked <@${args.member}>`)
            .setThumbnail(target.user.displayAvatarURL())
            .addField('Reason', args.reason)
            .setAuthor({
              name: target.user.tag,
              iconURL: target.user.displayAvatarURL(),
            })
            .setFooter({
              text: author.user.tag,
              iconURL: author.displayAvatarURL(),
            })
            .setTimestamp()
            .setColor('#C03D2F'),
        ],
      })
    )
  },
})
