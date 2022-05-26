import { Client, ClientOptions } from 'discord.js'
import { CommandHandler } from './CommandHandler'
import { EventHandler } from './EventHandler'

import config from '../config.json'

export class DHexClient extends Client {
  public commands: CommandHandler
  public events: EventHandler

  constructor() {
    super(config.client.options as ClientOptions)
    this.commands = new CommandHandler(this)
    this.events = new EventHandler(this)
  }

  async start() {
    await this.login(config.client.token)
    await this.commands.register()
    await this.events.register()
  }
}
