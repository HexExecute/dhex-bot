import { Client, ClientOptions, Guild } from 'discord.js'
import { CommandHandler } from './CommandHandler'
import { EventHandler } from './EventHandler'
import { checkMutes } from '../Scripts/mute'

import api from '../API/main'

const config = require('../../config.json')
import mongoose from 'mongoose'

export class DHexClient extends Client {
  public commands: CommandHandler
  public events: EventHandler
  public guild: Guild

  constructor() {
    super(config.client.options as ClientOptions)
    this.commands = new CommandHandler(this)
    this.events = new EventHandler(this)
    this.guild = {} as Guild
  }

  async start() {
    this.guild = await this.guilds.fetch(config.general.guildID)
    await mongoose
      .connect(config.database.mongoDB, { keepAlive: true })
      .then(async () => console.log('INFO: mongoDB connected'))
    api.run()
    await this.commands.register()
    await checkMutes()
    console.log('INFO: online')
  }
}
