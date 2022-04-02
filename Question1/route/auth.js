const express= require("express")
const {body,validationResult}=require("express-validator")
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const Users= require("../userModel")

const router= express.Router()
const jwtsecret="assigment"

router.post("/register",
[
 body("name").isLength({min:2}).withMessage("name must be greater than 2 char"),
 body("phone").isMobilePhone(),
 body('password').isLength({min:6}).withMessage("passord must be of atleast 8 char")

],async(req,res)=>{
    
    const errors =validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    const dbCheck= await Users.findOne({phone:req.body.phone});
    if(dbCheck){
        return res.send("User already exits")
    };
    const salt= bcrypt.genSaltSync(8);
    const hash= bcrypt.hashSync(req.body.password,salt)
    const nyauser= new Users({
        name:req.body.name,
        phone:req.body.phone,
        password:hash
    })
    try{
        await nyauser.save();
        const token= jwt.sign({id:nyauser._id},jwtsecret)
       return  res.send(token)
    }catch(error){
        return res.send("error at last")
    }
    
})



router.post("/login",[
    body("phone").exists().withMessage("plz enter phone no."),
    body("password").exists().withMessage("plz enter password")
],async(req,res)=>{

    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const dbCheckUser=  await Users.findOne({phone:req.body.phone});
 
    if(!dbCheckUser){
        return res.send("invalid credentials")
    }
    const correctUser=   bcrypt.compareSync(req.body.password,dbCheckUser.password)
    if(!correctUser){
        return res.send("invalid credentials")
    }

    try {
        const token= jwt.sign({id: dbCheckUser._id},jwtsecret)
        res.json({dbCheckUser,token})
            
        
       
      
    } catch (error) {
        res.send("errot at last ")
    }



})



module.exports=router;


 

