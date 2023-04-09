import { config } from 'dotenv'
import express from 'express'
import { connect as mongoConnect } from 'mongoose'
import cors from 'cors'

import Sector from 'models/Sector'
import UserInfo from 'models/UserInfo'
const app = express()
config()

mongoConnect(process.env.MONGO_URI) 
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

// To parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// To handle cors error
app.use(cors())

app.get('/', async (req, res) => {
	await res.sendStatus(200)
})
app.get('/helo',async (req, res) => {
 	await res.sendStatus(200)
})

app.get('/sector/getAllSector', async (_, res) => {
	
	try {
		const response = await Sector.find({})
		res.send(response)
	} catch (error) {
		res.status(500).json({message: error.message});
	}
})
app.get('/userInfo/getAllUserInfo', async (_, res) => {
	
	try {
		const response = await UserInfo.find({})
		res.send(response)
	} catch (error) {
		res.status(500).json({message: error.message});
	}
})
app.post('/userInfo/addUser', async(req, res) => {
    try {
        const sector = await UserInfo.create(req.body)
        res.status(200).json(sector)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
