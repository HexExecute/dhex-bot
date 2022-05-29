import express from 'express'
const config = require('../../config.json')

export default {
  run: () =>
    new Promise(() => {
      const app = express()

      app.get('/', (req, res) => {
        res.send('Hello World')
      })

      app.listen(config.api.port, () => {
        console.log('API: online')
      })
    }),
}
