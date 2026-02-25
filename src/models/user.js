const mongoose=require('mongoose');

const userSchema =new mongoose.Schema({   //schema is a structure of data
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailID:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
})

let userModel=mongoose.model("User",userSchema);   //model is a tool that manages the schema
 //keep it mind that the name will be in Capital of model
module.exports=userModel;