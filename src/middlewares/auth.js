const jwt = require('jsonwebtoken');
const User=require("../models/user");

const userAuth = async (req,res,next)=>{
  try{
 //Read the token from the req.cookies.
 const {token} =req.cookies

 if(!token){
  throw new Error("Token is not found")
 }

 const decodeObj=await jwt.verify(token,"DevTinder@9298");    //decodeObj have 3 things one is id,token, one other thing

 const {_id}=decodeObj;

 const user=await User.findById(_id);

 if(!user){
  throw new Error("User is not found")
 }
     // ⭐ attach user to request
     //req is a object
    req.key= user;
 next()
}
catch(err){
  res.status(400).send(err.message)
}
 //validate the token
 //Find the user

}

module.exports={
  userAuth
}