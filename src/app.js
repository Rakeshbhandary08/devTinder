
const express=require('express');
const connectDB = require("./config/database");
const app=express();   //create a server using server. //we have listen now
// const User=require("./models/user");
//write the upi using post method which will create the user; (post/signup)
// const {validateSignUpData}=require("./utils/validation");
// const bcrypt = require('bcrypt');
const cookieParser=require('cookie-parser')   //it is a middleware
const jwt=require('jsonwebtoken');

//Import the authRouters
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests");
const userRouter=require("./routes/user");


// const {userAuth} = require("./middlewares/auth");


app.use("/",express.json());    //This is how to use in-build middleware of express
app.use(cookieParser());         //It is a middleware used to read the cookie send by the browser



// app.post("/submit", async (req, res) => {
//   try {

//     // 1️⃣ Validate data
//     validateSignUpData(req);

//     // 2️⃣ Destructure body
//     const { firstName, lastName, emailId, password } = req.body;

//     // 3️⃣ Hash password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // 4️⃣ Create user with hashed password
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash
//     });

//     // 5️⃣ Save to DB
//     await user.save();

//     res.status(200).send("User created successfully");

//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

//Authentication System
// app.post("/login",async (req,res) => {
//     try{
//        const {emailId,password}=req.body;  //req se data le liya   
//        //First valid the email;
//        const user=await User.findOne({emailId:emailId});
//        if(!user){
//         throw new Error("Please sign-up first")
//        }
//        //Let's check the password now;
//        const isPasswordValid=await user.validatePassword(password);

//        if(isPasswordValid){

//         //create a JWT token

//         const token=await user.getJWT()
//         console.log(token);

//         //Add the token to cookie and send back the responce to the user
//         res.cookie("token",token,{
//         expires: new Date(Date.now() + 24*3600000) // cookie will be removed after 24 hours
//          });
//         res.send("Login successfully");
        
//        }
//        else{
//         throw new Error("Correct password daal Madharchod");
//        }
//     }
//     catch(err){
//         res.status(404).send(err.message)
//     }
// })

// app.get("/profile",userAuth,async (req,res)=>{
//     try{
//         const cookie=req.cookies;
//     const {token}=cookie;

//     if(!token){
//         throw new Error("Token nahi hai cookie me bsdk")
//     }

    

//     //Validate the token

//     const decodeMessage = await jwt.verify(token,"DevTinder@9298");
//     console.log(decodeMessage);

//     const {_id}=decodeMessage;

//     const user= await User.findById(_id);

//     const {firstName}=user;

//    console.log("Logged In user id: "+ firstName);

//     res.send(user);
//     }

//     catch(err){
//         res.status(404).send(err.message)
//     }

    
    
// })
// app.patch("/user/:id",async (req,res)=>{
//     const userId=req.params._id;
//     const data=req.body;
   
//     try{
//     const allowUpdate=["firstName","about","age","gender","skills"];

//     const isUpdateAllowed=Object.keys(data).every((k)=>allowUpdate.includes(k));

//     if(!isUpdateAllowed){
//         throw new Error("Updatation not allowed, sorry for the inconvience")
//     }
//     const user=await User.findByIdAndUpdate(req.params.id,data,{
//         returnDocument:"after",
//         runValidators:true,
//     })
//     res.send("User updated successfully")
// }
//    catch(err){
//      res.status(400).send(err.message)
//    }

// })

//Auth middleware created successfull by the name of userAuth.

// app.post("/connection",userAuth,async (req,res)=>{
//     const user= req.user;
//     res.send(user.firstName+ " " + user.lastName + " send connection to you")
// });

//How to use Imported routers.
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

//First connect to the database then listen to the api calls on some port
connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(2000,()=>{
    console.log("server is successfully listening on port 1000")
    });

}).catch(err=>{
    console.error("Database cannot be connecte")
});











