import { DHexClient } from './DHexClient'
import { Event } from './Event'
import { ClientEvents } from 'discord.js'

import config from '../config.json'
import fs from 'fs'
import path from 'path'

export class EventHandler {
  public client: DHexClient

  constructor(client: DHexClient) {
    this.client = client
  }

  async register() {
    const dir: string = path.join(__dirname, '../', config.events.directory)
    const files: string[] = fs.readdirSync(dir)

    for (const file of files) {
      const event: Event<keyof ClientEvents> = (await import(dir + file))
        .default
      this.client.on(event.event, event.run)
    }
    console.log('INFO: events have been registered')
  }
}
