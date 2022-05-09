import { DHexClient } from './Structures/DHexClient'
import dashboard from './Dashboard/main'

const client = new DHexClient()

client.on('ready', async () => {
  console.clear()
  await dashboard()
  console.log('INFO: online')
})

client.start()
