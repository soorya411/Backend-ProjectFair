const users = require('../Models/userSchema')

// json token
 const jwt = require('jsonwebtoken')
//register logic
exports.register=async(req,res)=>{
    console.log("inside register function");

    //object destructuring
    const {username,email,password} = req.body
    try{
const existingUser = await users.findOne({email})

    if(existingUser){
        res.status(401).json("user already registered")
    }
    //if the email is not present in db->new user data will save to the database
    else{
    const newUser = await users({
        username,email,password,github:'',link:'',profile:''
    })
    await newUser.save() //save new user data to database
    res.status(200).json("user registration successful")
    }
}
    catch(error){
res.status(500).json("server error :" +error.message)
    }
    
}


//logic login

exports.login = async(req,res)=>{
    const {email,password}=req.body
    try{
const user = await users.findOne({email,password})
if(user){
    //token generation
    const token = jwt.sign({userId:user._id},"superkey2024")
    console.log(token);
    res.status(200).json({user,token})
    
}
else{
    res.status(404).json("invalid login")
}
    }
    catch(error){
        res.status(500).json("server error "+error.message)
    }
}