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

app.use(express.json())
app.use(express.urlencoded({extended: true}))
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
        const userInfo = await UserInfo.create(req.body)
        res.status(200).json(userInfo)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})
app.put('/userInfo/:id' , async (req , res) => {
	try {
		const {id} = req.params;
		const userInfo = await UserInfo.findByIdAndUpdate(id, req.body);

		//can't find user in db
		if(!userInfo){
			return res.status(404).json({message: `User not found with ID ${id}`})
		}
		const updatedUserInfo = await UserInfo.findById(id);
		res.status(200).json(updatedUserInfo);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))
