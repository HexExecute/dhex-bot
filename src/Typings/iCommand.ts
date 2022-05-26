import { DHexClient } from '../Structures/DHexClient'
import {
  ApplicationCommandOptionData,
  CommandInteraction,
  PermissionResolvable,
} from 'discord.js'

export interface CommandOptions {
  args: object
  interaction: CommandInteraction
  client: DHexClient
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
