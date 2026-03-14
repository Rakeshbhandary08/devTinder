const mongoose=require("mongoose");

const connectionReq=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",  //reference to the User Collection
        required:true,

    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored", "interested", "accepted", "rejected"],
            message:`{VALUE} is not a valid status`
        }
    }
},{timestamps:true});

connectionReq.index({senderId:1,receiverId:1});    //it's like making a register of the given details so we can search easily.

//Pre Hook before the saving the data to the database.
// connectionReq.pre("save",function (next){
//     const connectionRequest=this;
//     if(connectionRequest.senderId.equals(connectionRequest.receiverId)){
//         throw new Error("Cannot send the connectioReq to yourself")
//     }
//     next();
// })

const ConnectionReq=new mongoose.model("ConnectionReq",connectionReq);

module.exports=ConnectionReq;