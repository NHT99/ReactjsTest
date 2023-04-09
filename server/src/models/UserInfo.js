import { Schema, model } from 'mongoose'

const userInfoSchema = new Schema({
            name: {
                type: "string",  
            },
            sector: {
                type: 'string',  
            },
            agree: {
                type: 'boolean',
         } 
})

const userInfoModel = model('userInfo', userInfoSchema, "userInfo")
export default userInfoModel
