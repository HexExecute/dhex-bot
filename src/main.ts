import { DHexClient } from './Structures/DHexClient'
import config from './config.json'

export const client = new DHexClient()

console.clear()
client.events.register()
client.login(config.client.token)
