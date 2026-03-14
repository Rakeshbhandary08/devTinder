const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");
const User = require("../models/user");
const userRouter=express.Router();

//Get all the pending connection request for the login User
userRouter.get("/user/requests",userAuth,async (req,res)=>{
    try{
       // Step 1: Get logged in user from req.key

       const loggedInUser=req.key;
        
        // Step 2: Find all connection requests from ConnectionReq collection where
        // receiverId === loggedInUser._id AND status === "interested"

        const connectionRequest=await ConnectionReq.find({
            receiverId:loggedInUser._id,status:"interested"
        }).populate("senderId",["firstName","lastName"]);

        // Step 3: If no requests found → send "No pending requests"
        if(connectionRequest.length===0){
            return res.status(404).send("No Pending requests")
        }

        // Step 4: Send the data back with success message
        res.json({message:"Successfully feched your requests",connectionRequest})

    }
    catch(err){
        res.status(400).send(err.message)
    }

})

userRouter.get("/user/connection",userAuth,async (req,res)=>{
    try{
        
        // Step 1: Get logged in user from req.key

        const loggedInUser=req.key;

        // Step 2: Find all connection requests from ConnectionReq collection where
        // status === "accepted" AND
        // senderId === loggedInUser._id OR receiverId === loggedInUser._id

        const connectedPeople=await ConnectionReq.find(
            {$or:[{senderId:loggedInUser._id},{receiverId:loggedInUser._id}],
            status:"accepted"}).populate("senderId",["firstName","lastName"])
                               .populate("receiverId",["firstName","lastName"])

        // Step 3: If no connections found → send "No connections found"

        if(!connectedPeople.length){
            return res.send("No connections found")
        }

        // Step 4: We get back data with senderId and receiverId
        // But we only want to show the OTHER person's profile
        // (not the logged in user's own profile)
        // So we need to extract the other person from each connection
        
        const data = connectedPeople.map((connection) => {
        // If logged in user is the sender → return receiver's profile
       if(connection.senderId._id.toString() === loggedInUser._id.toString()){
        return connection.receiverId;
       }
       // If logged in user is the receiver → return sender's profile
       return connection.senderId;
        })

        // Step 5: Send the data back with success message

        res.json({message:"Connection feched successfully",data})
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
         // Step 1: Get logged in user from req.key

         const loggedInUser=req.key;

        // Step 2: Find ALL connection requests from ConnectionReq collection
        // where loggedInUser is EITHER sender OR receiver (any status)
        // $or: [{ senderId: loggedInUser._id }, { receiverId: loggedInUser._id }]

        const connectionRequest=await ConnectionReq.find({$or:[{senderId:loggedInUser._id},
                                        {receiverId:loggedInUser._id}]})


        // Step 3: Extract all user IDs that should be HIDDEN from feed
        // (people you already have any connection with)
        // Use .reduce() or .map() to collect all IDs into a Set

        let connectedPeople=new Set();

        connectionRequest.forEach((item)=>{
            connectedPeople.add(item.senderId.toString());
            connectedPeople.add(item.receiverId.toString());
        })

        // Step 4: Also add loggedInUser._id to the hidden list
        // (you should not see yourself in feed)

        // Step 5: Find all users from User collection
        // where _id is NOT in the hidden list
        // Use $nin (not in) operator

        const userFeed=await User.find({
            _id:{$nin:Array.from(connectedPeople)}
        }).select("firstName lastName");

        // Step 6: If no users found → send "No users found"

        if(!userFeed.length){
            return res.send("No users found")
        }

        // Step 7: Send the data back with success message
        res.json({
            message:"Your Feed Data Fetched Successfully",
            userFeed
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports=userRouter;
//Backend Development.
