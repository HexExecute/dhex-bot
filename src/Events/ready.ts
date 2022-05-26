import { Event } from '../Structures/Event'

export default new Event('ready', () => {
  console.clear()
  console.log('INFO: online')
})
