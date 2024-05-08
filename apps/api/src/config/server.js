import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import appRoute from '../routes/app.route'
import path from 'path'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../../../', 'client/build')))
app.get('/', (req, res) => {})

app.use('/api', appRoute)

export default app
