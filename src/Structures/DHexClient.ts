import { Client } from 'discord.js'
import { CommandHandler } from './CommandHandler'
import { client } from '../config.json'

export class DHexClient extends Client {
  public handler: CommandHandler = new CommandHandler(this)

  constructor() {
    super(client.options)
  }

  public start(): void {
    this.login(client.token)
  }
}
