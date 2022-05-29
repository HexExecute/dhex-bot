import { CommandInteraction, GuildMember } from 'discord.js'
import { client } from '../main'
import muteSchema from '../Schemas/mute'

import config from '../config.json'
import ms from 'ms'

const { muteRole } = config.roles

async function getCurrentlyMuted(target: GuildMember) {
  const previousMutes = await muteSchema.find({
    targetID: target.user.id,
  })

  return previousMutes.filter(mute => mute.active === true)
}

async function unmute(target: GuildMember) {
  const currentlyMuted = await getCurrentlyMuted(target)

  if (currentlyMuted.length)
    for (const mute of currentlyMuted) {
      mute.active = false
      mute.save()
    }

  if (target.roles.cache.has(muteRole)) target.roles.remove(muteRole)
  console.log(`INFO: ${target.user.id} has been unmuted`)
}

async function mute(
  author: GuildMember,
  target: GuildMember,
  reason: string,
  duration: string
) {
  const currentlyMuted = await getCurrentlyMuted(target)

  let time: Date | null
  if (duration) time = new Date(Date.now() + ms(duration))
  else time = null

  if (currentlyMuted.length)
    for (const mute of currentlyMuted) {
      mute.active = false
      mute.save()
    }

  return await new muteSchema({
    authorID: author.user.id,
    targetID: target.user.id,
    reason: reason,
    active: true,
    expiresAt: time,
  })
    .save()
    .then(() => {
      !target.roles.cache.has(muteRole) ? target.roles.add(muteRole) : null
      console.log(`INFO: ${target.user.id} has been muted by ${author.user.id}`)
      if (duration) setTimeout(() => checkMutes(), ms(duration))
    })
}

async function checkMutes() {
  ;(await client.guild.members.fetch()).forEach(async target => {
    const currentlyMuted = await getCurrentlyMuted(target)
    for (const mute of currentlyMuted) {
      if (!mute.expiresAt) continue
      if (mute.expiresAt.getTime() <= Date.now())
        unmute(target).then(() =>
          console.log(`INFO: ${target.user.id}'s mute has expired`)
        )
    }
  })
}

export { mute, unmute, checkMutes }
