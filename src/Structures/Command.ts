import { iCommand } from '../Typings/iCommand'

export class Command {
  constructor(data: iCommand) {
    Object.assign(this, data)
  }
}
