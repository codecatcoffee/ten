import dotenv from 'dotenv'
import ItemModel from '../models/Item.model'
import randomSeed from '../helpers/randomSeed'

dotenv.config()

const { API_KEY } = process.env

export const createItem = async (req, res) => {
  const apiKey = req.headers['x-api-key']

  if (apiKey && apiKey === API_KEY) {
    try {
      const seeds = randomSeed()
      const seed1 = seeds[0]
      const seed2 = seeds[1]
      const seed3 = seeds[2]

      const newItem = await new ItemModel({
        text: req.body.text,
        seed1: seed1,
        seed2: seed2,
        seed3: seed3,
        seedKey: seed1[0] + seed2[0] + seed3[0]
      }).save()

      if (newItem) {
        return res.status(201).json({
          status: 'success',
          message: 'Item created successfully',
          data: {
            seed1: newItem.seed1,
            seed2: newItem.seed2,
            seed3: newItem.seed3,
            expireAt: newItem.expireAt - Date.now()
          }
        })
      }

      return res.status(400).json({
        status: 'error',
        message: 'Item not created',
        data: null
      })
    } catch (error) {
      console.log(error)

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: error
      })
    }
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
      data: null
    })
  }
}

export const readItem = async (req, res) => {
  const apiKey = req.headers['x-api-key']

  if (apiKey && apiKey === API_KEY) {
    try {
      const { seedKey } = req.params

      if (seedKey) {
        const item = await ItemModel.findOne({ seedKey: seedKey })

        if (item) {
          return res.json({
            status: 'success',
            message: 'Item found',
            data: {
              text: item.text,
              seed1: item.seed1,
              seed2: item.seed2,
              seed3: item.seed3,
              expireAt: item.expireAt - Date.now()
            }
          })
        }

        return res.status(404).json({
          status: 'error',
          message: 'Item not found',
          data: null
        })
      }

      return res.status(400).json({
        status: 'error',
        message: 'Seed key is required',
        data: null
      })
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        data: error
      })
    }
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
      data: null
    })
  }
}
