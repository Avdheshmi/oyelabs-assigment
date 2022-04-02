const mongoose =require("mongoose")
const {Schema}=mongoose 


const userSchema=  new Schema({
        
    name: {
     type:String
    },
   email:{
       type:String
   }
    
})

const UsersQ3= mongoose.model("UsersQ3",userSchema)
module.exports=UsersQ3