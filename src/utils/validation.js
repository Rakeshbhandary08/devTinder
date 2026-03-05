const validator=require('validator');

//here we are explicity validating the user details
const validateSignUpData=(req)=>{

    const {firstName,lastName,emailId,password} =req.body;
    
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(firstName.length <  4 || firstName.length > 21){
        throw new Error("FirstName should be between 5 to 20 characters")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid bharve")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a more strong password")
    } 
}

module.exports={validateSignUpData};