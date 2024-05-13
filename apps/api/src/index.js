import 'dotenv/config'
import createServer from './config/server'
import initDB from './config/database'

initDB()

const server = createServer()
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log('SERVER LISTENING ON PORT', PORT)
})
