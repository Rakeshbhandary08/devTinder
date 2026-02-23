
const express=require('express');
const { userAuth } = require('./middlewares/auth');


const app=express();   //create a server using server. //we have listen now

app.use("/adminn",userAuth)

app.get("/admin",(req,res)=>{
    res.send("Welcome to your website")
})

app.listen(1000,()=>{
    console.log("server is successfully listening on port 3000")
});







