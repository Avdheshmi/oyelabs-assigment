const express= require("express")
const {body,validationResult}=require("express-validator")
const { findOneAndUpdate } = require("./model")
const router= express.Router()
const UsersQ3= require("./model")
router.post("/addUser",[
    body("name").isLength({min:2}).withMessage("name must be greater than 2 char"),
    body("email").isEmail(),
],async (req,res)=>{
    const errors =validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    const dbCheck= await UsersQ3.findOne({email:req.body.email});
    if(dbCheck){
       
       return res.send("user already exists")
    };
    const nyauser= new UsersQ3({
        name:req.body.name,
        email:req.body.email
       
    })
    try{
        const newUser=await nyauser.save();
        
       return  res.send(newUser)
    }catch(error){
        return res.send("error at last")
    }
})

router.put("/update/:id",async(req,res)=>{

    try {
        const updatedUser = await UsersQ3.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}
            
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).send("error at last");
    }
})
module.exports=router;