import { DHexClient } from './DHexClient'
import { Command } from './Command'

export class CommandHandler {
  private client: DHexClient
  public commands: Map<string, Command> = new Map()

  constructor(client: DHexClient) {
    this.client = client
  }

  register(): void {}
}
