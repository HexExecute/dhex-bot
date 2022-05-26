import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js'

export interface CommandOptions {
  args: object
  interaction: CommandInteraction
}

export interface iCommand {
  name: string
  description: string
  usage: string
  aliases?: string[]
  permissions?: string[]
  options?: ApplicationCommandOptionData
  execute: (options: CommandOptions) => void
}
