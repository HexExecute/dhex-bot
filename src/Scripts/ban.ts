import { GuildBan, GuildMember, User } from 'discord.js'
import { client } from '../main'

import banSchema from '../Schemas/ban'

import ms from 'ms'

async function getCurrentlyBanned(target: User) {
  const previousBans = await banSchema.find({ targetID: target.id })

  return previousBans.filter(ban => ban.active === true)
}

async function ban(
  author: GuildMember,
  target: User,
  reason: string,
  duration: string
) {
  const targetMember: GuildMember = await client.guild.members.fetch(target.id)

  if (!targetMember) return
  if (!targetMember.bannable) return

  const currentlyBanned = await getCurrentlyBanned(target)

  let time: Date | null
  if (duration) time = new Date(Date.now() + ms(duration))
  else time = null

  if (currentlyBanned.length)
    for (const ban of currentlyBanned) {
      ban.active = false
      ban.save()
    }

  return await new banSchema({
    authorID: author.user.id,
    targetID: target.id,
    reason: reason,
    active: true,
    expiresAt: time,
  })
    .save()
    .then(async () => {
      if (!(await client.guild.bans.fetch()).get(target.id))
        await client.guild.bans.create(target.id, { reason: reason })
      console.log(`INFO: ${target.id} has been banned by ${author.user.id}`)
      if (duration) setTimeout(() => checkBans(), ms(duration))
    })
}

async function unban(target: User) {
  if (!(await client.guild.bans.fetch()).get(target.id)) return

  const currentlyBanned = await getCurrentlyBanned(target)

  if (currentlyBanned.length)
    for (const ban of currentlyBanned) {
      ban.active = false
      ban.save()
    }

  client.guild.bans.remove(target)
  console.log(`INFO: ${target.id} has been unbanned`)
}

async function checkBans() {
  ;(await client.guild.members.fetch()).forEach(async target => {
    const currentlyBanned = await getCurrentlyBanned(target.user)
    for (const ban of currentlyBanned) {
      if (!ban.expiresAt) continue
      if (ban.expiresAt.getTime() <= Date.now())
        unban(target.user).then(() =>
          console.log(`INFO: ${target.user.id}'s ban has expired`)
        )
    }
  })
}

export { ban, unban, checkBans }
