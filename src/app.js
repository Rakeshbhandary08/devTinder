
const express=require('express');
const connectDB = require("./config/database");
const app=express();   //create a server using server. //we have listen now
const User=require("./models/user");
//write the upi using post method which will create the user; (post/signup)

app.post("/signup",async (req,res)=>{
    
    const user = new User({
        firstName:"Muzan",
        lastName:"kibutsuji",
        emailId:"akaza@gmail.com",
        password:"tanjiro@123"
        
    });  //i am creating a new instance(document) of a user model

    try{
     await user.save()   //now data is saved to the database.
     res.send("Data is send successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user "+ err.message)
    }
    
})


//First connect to the database then listen to the api calls on some port
connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(1000,()=>{
    console.log("server is successfully listening on port 1000")
    });

}).catch(err=>{
    console.error("Database cannot be connecte")
});











