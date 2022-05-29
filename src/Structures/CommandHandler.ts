import { DHexClient } from './DHexClient'
import { iCommand } from '../Typings/iCommand'
import {
  Guild,
  ApplicationCommandDataResolvable,
  ApplicationCommandData,
} from 'discord.js'

const config = require('../../config.json')
import fs from 'fs'
import path from 'path'

export class CommandHandler {
  public list: Map<string, iCommand> = new Map()
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

      this.list.set(cmd.name, cmd)
      this.slashCommands.push(cmd as ApplicationCommandData)

      if (cmd.aliases)
        for (const alias of cmd.aliases) {
          this.list.set(alias, cmd)
          let temp = Object.assign({}, cmd)
          temp.name = alias
          temp.aliases = null
          temp.description = 'Alias for ' + cmd.name
          this.slashCommands.push(temp)
        }
    }

    if (!config.general.guildID)
      return console.error('ERROR: please provide a guildID in the config')

    const guild: Guild = await this.client.guilds.fetch(config.general.guildID)
    await guild.commands
      .set(this.slashCommands)
      .then(() => console.log('INFO: commands have been registered'))
  }

  getCommand(command: string): iCommand {
    const cmd = this.list.get(command)

    if (cmd) return cmd
    else throw new Error(`ERROR: couldn't find command named '${command}'`)
  }
}
