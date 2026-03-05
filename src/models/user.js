const mongoose=require('mongoose');;

const validator=require('validator');

const userSchema =new mongoose.Schema({   //schema is a structure of data
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
              throw new Error("Invalid email hai chutiye")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(pass){
            if(!validator.isStrongPassword(pass)){
                throw new Error("Thoda or strong password bana laude")
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:60,
        validate(num){
            if(!validator.isNumeric(num)){
                throw new Error("Bahenchod number likh")
            }
        }
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","other"].includes(value)){
               throw new Error("Hizra hai kya?")
            }
        },
    },
    photoUrl:{
        type:String,
        validate(str){
            if(!validator.isURL(str)){
                throw new Error("Bakk madharchod")
            }
        },
        //default:"https://imgv3.fotor.com/images/gallery/beautiful-machine-girl-with-blue-eyes-created-by-Fotor-ai-art-creator.jpg"
    },
    about:{
      type:String,
      //default:"This is a default about of the user"
    },
    skills:{
        type:[String]
    }

},{
    timestamps:true
})

let userModel=mongoose.model("User",userSchema);   //model is a tool that manages the schema
 //keep it mind that the name will be in Capital of model
module.exports=userModel;

