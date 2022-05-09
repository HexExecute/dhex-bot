import express from 'express'
import path from 'path'

export default async function () {
  const app = express()

  await app.listen(3000, () => {
    console.log('STARTUP: dashboard started on port 3000')
  })

  app.use(express.static(path.join(__dirname, '../../dashboard')))
}
