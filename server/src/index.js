import { config } from 'dotenv'
import express from 'express'
import { connect as mongoConnect } from 'mongoose'
import cors from 'cors'

import Sector from 'models/Sector'

config()

mongoConnect(process.env.MONGO_URI)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

const app = express()

// To parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// To handle cors error
app.use(cors())
app.get('/', (req, res) => {
    res.sendStatus(200)
})
app.get('/helo', (req, res) => {
    res.sendStatus(200)
})

app.get('/getAllSector', async (_, res) => {
	try {
		const response = await Sector.find({})
		res.sendStatus(200).json(response)
	} catch (error) {
		res.status(500).json({message: error.message});
	}
	
	
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
