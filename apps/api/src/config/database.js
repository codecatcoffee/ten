import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { MONGO_URI } = process.env

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    return console.log('DATABASE IS CONNECTED')
  } catch (error) {
    return console.log('DATABASE IS NOT CONNECTED ' + error)
  }
}

export default connect
