export enum CommandType {
  Both = 0,
  Interaction = 1,
  Text = 2,
}

interface options {
  args?: any
  interaction?: any
  message?: any
}

export interface iCommand {
  name: string
  description: string
  usage: string
  aliases?: string[]
  type: CommandType
  prefix?: string
  permissions?: string[]
  options?: any
  execute: (options: options) => void
}
