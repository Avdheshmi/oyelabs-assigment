const express= require("express")
const mongoose= require("mongoose")
const App= express()
mongoose.connect('mongodb://localhost:27017/nodeAssigment');
const auth= require("./route/auth")

App.get("/", (req,res)=>{
    res.send("Welcome to backend")
})
App.use(express.json())

App.use("/auth",auth)


const port=1000
App.listen(port,()=>{
    console.log(`your app running on port ${port}`)
})