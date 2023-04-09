import { Schema, model } from 'mongoose'

const todoSchema = new Schema({
    title: String,
})

const todoModel = model('sector', todoSchema)
export default todoModel

// const mongoose = require('mongoose')

// const sectorSchema = mongoose.Schema({
//         sector: {
           
//         },
//         userInfo: {
//             name: {
//                 type: "string",
//                 required: [true, "Please enter name"]
//             },
//             sector: {
//                 type: 'string',
//                 required: [true, "Please enter sector"]
//             },
//             agree: {
//                 type: 'boolean',
//                 required: [true, "Please agree terms"],
//                 default: false
//          }
// }})
// const Sector = mongoose.model("sector", sectorSchema);

// module.exports = Sector;