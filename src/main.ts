import { DHexClient } from './Structures/DHexClient'
const config = require('../config.json')

export const client = new DHexClient()

console.clear()
client.events.register()
client.login(config.client.token)
