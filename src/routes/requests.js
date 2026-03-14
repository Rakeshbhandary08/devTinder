const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionReq = require("../models/connectionReq");
const User = require("../models/user"); // 👈 Add this

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:receiverId", userAuth, async (req, res) => {
    try {
        const senderId = req.key._id;
        const receiverId = req.params.receiverId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Invalid Status");
        }
        

         //User cannot send a connection request to ownself
        if(senderId.toString() === receiverId.toString()){        
            return res.status(403).send("You cannot send a connection request to yourself")
        }

        // ✅ Now correctly checking the User collection
        const receiverExist = await User.findById(receiverId);
        if (!receiverExist) {
            return res.status(404).send("User does not exist");
        }


        const existConnectionReq = await ConnectionReq.findOne({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });

        if (existConnectionReq) {
            return res.status(400).send("Connection Request Already Exists");
        }

        const connectionRequest = new ConnectionReq({
            senderId,
            receiverId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message:status ==="interested" ? 
            req.key.firstName + " is "+status+ " in " + receiverExist.firstName:
            req.key.firstName +" " + status +" "+ receiverExist.firstName,
            data
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res) =>{
    try{
    
        // Step 1: Get logged in user from req.key
        const loggedInUser=req.key;
       
        // Step 2: Get/Extrat status and requestId from req.params
            const {status,requestId}=req.params;
 
        // Step 3: Validate status (only "accepted" or "rejected" allowed)
        const allowedStatus=["accepted","rejected"];

         if(!allowedStatus.includes(status)){
             return res.status(404).json({message:"Status is not Valid"})
         } 

        // Step 4: Find the connection request by requestId in ConnectionReq collection

        const connectionRequest=await ConnectionReq.findOne({_id:requestId
            ,receiverId:loggedInUser._id,status:"interested"})

        // Step 5: If not found → send error "Request does not exist"

        if(!connectionRequest){
            return res.status(404).send("Request does not exist")
        }

        // Step 6: Verify logged in user is the receiver   (Already Done)
        // connectionRequest.receiverId should match loggedInUser._id
        // If not → send error "You are not authorized"
        // Step 7: Verify current status is "interested"  (Done)
        // If status is already "accepted" or "rejected" → send error "Request already reviewed"

        // Step 8: Update the status of the connection request

         connectionRequest.status = status;

        // Step 9: Save the updated connection request

        let data=await connectionRequest.save()

        // Step 10: Send success response with updated data
        res.json({message:"Connection requested"+" "+status,data})


    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = requestRouter;