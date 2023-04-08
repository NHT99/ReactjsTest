const express = require('express')
const mongoose = require('mongoose')
const Sector = require('./models/sectorModel')
const app = express()


app.use(express.json())
//routes
app.get('/', (req, res) => {
    res.send('Hello Node Api')
})
// app.get('/sector', async(req, res) => {
//     try {
//         const sectors = await Sector.find({})
//         res.status(200).json(sectors);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }    
// })
// app.post('/userInfo', async(req, res) => {
//     try {
//         const sector = await Sector.create(req.body)
//         res.status(200).json(sector)
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
//     }
// })
// app.post('/userInfo/:id', async(req, res) => {
//     try {
//         const {id} = req.params;
        
//         const sector = await Sector.findByIdAndUpdate(id, req.body);
//         if(!sector) {
//             return res.status(404).json({message: `Cannot not find id ${id}`})
//         }
//         res.status(200).json(sector)
//     } catch (error) {
        
//         res.status(500).json({message: error.message});
//     }
// })
mongoose.connect('mongodb+srv://admin:00000000@sectorapi.uws2jbo.mongodb.net/SectorAPI?retryWrites=true&w=majority')
.then(() =>{
    console.log("connected");
}).catch(err => {
    console.log(err);
})
app.listen(8000, () => {
    console.log("API running on port 8000");
})