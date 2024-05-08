import dotenv from 'dotenv'
import app from './config/server'
import initDB from './config/database'

dotenv.config()
initDB()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log('SERVER LISTENING ON PORT', PORT))
