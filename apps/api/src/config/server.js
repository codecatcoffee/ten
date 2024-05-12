import path from 'path'
import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import appRoute from '../routes/app.route'

const createServer = () => {
  const app = express()
  const clientPath = path.join(__dirname, '../../../', 'client/build')

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use('/api', appRoute)
  
  app.use(express.static(clientPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })

  return app
}

export default createServer
