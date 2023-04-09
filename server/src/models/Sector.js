import { Schema, model } from 'mongoose'

const sectorSchema = new Schema({
	sector: {
           
	},
	userInfo: {
		name: {
			type: "string",
			required: [true, "Please enter name"]
		},
		sector: {
			type: 'string',
			required: [true, "Please enter sector"]
		},
		agree: {
			type: 'boolean',
			required: [true, "Please agree terms"],
			default: false
	 }
}
})

const sectorModel = model('sector', sectorSchema)
export default sectorModel
