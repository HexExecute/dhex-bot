import { Event } from '../Structures/Event'
import { client } from '../main'

export default new Event('ready', async () => {
  await client.start()
})
