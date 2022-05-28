import express from 'express'
import config from '../config.json'

export default {
  run: async () => {
    const app = express()

    app.get('/', (req, res) => {
      res.send('Hello World')
    })

    app.listen(config.api.port, () => {
      console.log('API: online')
    })
  },
}
