


const userAuth=(req,res,next)=>{
    let token="abccs";
    const tokenValidate=token ==="abc";
    if(!tokenValidate){
        res.status(401).send("Unathorised DATA")
    }
    else{
        next()
    }
    
}





module.exports={
    userAuth
}