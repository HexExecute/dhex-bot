import { DHexClient } from './DHexClient'
import { CommandOptions, iCommand } from '../Typings/iCommand'
import {
  Guild,
  ApplicationCommandDataResolvable,
  ApplicationCommandData,
} from 'discord.js'

import config from '../config.json'
import fs from 'fs'
import path from 'path'

export class CommandHandler {
  public commands: Map<string, iCommand> = new Map()
  public client: DHexClient

  private slashCommands: ApplicationCommandDataResolvable[] = []

  constructor(client: DHexClient) {
    this.client = client
  }

  async register() {
    const dir: string = path.join(__dirname, '../', config.commands.directory)
    const files: string[] = fs.readdirSync(dir)

    for (const file of files) {
      let cmd = (await import(dir + file)).default

      this.commands.set(cmd.name, cmd)
      this.slashCommands.push(cmd as ApplicationCommandData)
    }

    if (!config.general.guildID)
      return console.error('ERROR: please provide a guildID in the config')

    const guild: Guild = await this.client.guilds.fetch(config.general.guildID)
    guild.commands
      .set(this.slashCommands)
      .then(() => console.log('INFO: commands have been registered'))
  }

  runCommand(command: string, options: CommandOptions) {
    const cmd = this.commands.get(command)

    if (cmd) return cmd.execute(options)
    else return console.error(`ERROR: couldn't find command named '${command}'`)
  }
}
