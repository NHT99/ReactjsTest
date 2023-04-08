const mongoose = require('mongoose')

const sectorSchema = mongoose.Schema({
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
}})
const Sector = mongoose.model("Sector", sectorSchema);

module.exports = Sector;