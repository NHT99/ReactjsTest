import { Schema, model } from 'mongoose'

const sectorSchema = new Schema({
	sector: {
           
	}
	
})

const sectorModel = model('sector', sectorSchema, "sectors")
export default sectorModel
