import { DHexClient } from '../Structures/DHexClient'
import {
  ApplicationCommandOptionData,
  CommandInteraction,
  GuildMember,
  PermissionResolvable,
} from 'discord.js'

export interface CommandOptions {
  args: any
  interaction: CommandInteraction
  client: DHexClient
  author: GuildMember
}

export interface iCommand {
  name: string
  description: string
  usage: string
  aliases?: string[]
  permissions?: PermissionResolvable
  ephemeral?: boolean
  options?: ApplicationCommandOptionData[]
  execute: (options: CommandOptions) => any
}
