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

const userInfoModel = model('UserInfo', userInfoSchema, "userInfo")
export default userInfoModel
