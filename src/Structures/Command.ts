import { iCommand } from '../Typings/iCommand'
import { commands } from '../config.json'

export class Command {
  public data: iCommand

  constructor(data: iCommand) {
    this.data = data
    if (!this.data.prefix) this.data.prefix = commands.defaultPrefix
  }
}
