const express=require("express");
const {userAuth} = require("../middlewares/auth");

const profileRouter=express.Router();

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
       res.send(req.key);
    }

    catch(err){
        res.status(404).send(err.message)
    }   
})

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
         // 1️⃣ Check what fields user is trying to update
         const updatedElements=["firstName","lastName","age","gender","skills"]

          // 2️⃣ Validate — is every field in req.body allowed?
        const checkingElements=Object.keys(req.body).every(item=>updatedElements.includes(item))

          // 3️⃣ If not allowed, throw error
          if(!checkingElements){
            throw new Error("Invalid updates")
          }
          // 4️⃣ Update the user in DB
          const updateUser=req.key

             // 5️⃣ Assign each field from req.body to user
             Object.keys(req.body).forEach((data)=>{
                updateUser[data]=req.body[data];
             })

             // 6️⃣ Save to DB
             await updateUser.save()

             res.send(` ${updateUser.firstName} User updated Successfully`)

    }
    catch(err){
         res.status(400).send(err.message)
    }
})

// profileRouter.patch("/profile/password",(req,res)=>{
   
// })

module.exports=profileRouter;
