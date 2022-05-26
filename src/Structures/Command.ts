import { iCommand } from '../Typings/iCommand'

export class Command {
  public ephemeral?: boolean
  constructor(data: iCommand) {
    Object.assign(this, data)
    if (!data.ephemeral) this.ephemeral = false
  }
}
