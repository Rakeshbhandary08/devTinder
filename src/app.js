
const express=require('express');

const app=express();   //create a server using server. //we have listen now

app.use("/test",(req,res)=>{    //this is function in known as request handler
    res.send("Hello from the server")
})


app.listen(10000,()=>{
    console.log("server is successfully listening on port 3000")
});

