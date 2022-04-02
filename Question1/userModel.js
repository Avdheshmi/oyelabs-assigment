const mongoose =require("mongoose")
const {Schema}=mongoose 


const userSchema=  new Schema({
        
    name: {
     type:String
    },
   phone:{
       type:String
   },
    password:{
        type:String
    }
})

const Users= mongoose.model("Users",userSchema)
module.exports=Users