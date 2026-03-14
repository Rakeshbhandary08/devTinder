const express=require("express");
const {validateSignUpData}=require("../utils/validation");
const authRouter=express.Router();
const User=require("../models/user");
const bcrypt = require('bcrypt');

authRouter.post("/signup", async (req, res) => {
  try {

    // 1️⃣ Validate data
    validateSignUpData(req);

    // 2️⃣ Destructure body
    const { firstName, lastName, emailId, password } = req.body;

    // 3️⃣ Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4️⃣ Create user with hashed password
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash
    });

    // 5️⃣ Save to DB
    await user.save();

    res.status(200).send("User created successfully");

  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login",async (req,res) => {
    try{
       const {emailId,password}=req.body;  //req se data le liya   
       //First valid the email;
       const user=await User.findOne({emailId:emailId});
       if(!user){
        throw new Error("Please sign-up first")
       }
       //Let's check the password now;
       const isPasswordValid=await user.validatePassword(password);

       if(isPasswordValid){

        //create a JWT token

        const token=await user.getJWT()
        console.log(token);

        //Add the token to cookie and send back the responce to the user
        res.cookie("token",token,{
        expires: new Date(Date.now() + 24*3600000) // cookie will be removed after 24 hours
         });
        res.send("Login successfully");
        
       }
       else{
        throw new Error("Correct password daal Madharchod");
       }
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

authRouter.post("/logout",(req,res)=>{
  
  //when we want to send back data to client/browser
  res.cookie("token",null,
    {expires:new Date(Date.now())})
    .send("Logout successfully");     //khatam immediately

})

module.exports=authRouter;