const mongoose=require("mongoose");

const connectDB=async()=>{
 await mongoose.connect("mongodb+srv://SunoBharat9298:SunoBharat9298@sunobharat.axnulcc.mongodb.net/devTinder")
}

module.exports=connectDB;




