const users = require('../Models/userModel')
//jwt token for login
const jwt = require('jsonwebtoken')

//defining logic to register
exports.register = async (req,res)=>{
    console.log("Inside register request!!!");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        //check email is present in db or not
        const existingUser = await users.findOne({email})
        //if email is present then existing user
        if(existingUser){
            res.status(406).json("User Already exists!!!")
        }else{
        //else store / insert data to db
            //creating object for model; arguments should be in same order
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            //to store data to mongodb from mongoose model
            await newUser.save()
            res.status(200).json(newUser)
            }
    }catch(err){
        res.status(401).json(err)
    }
    
}

//defining logic to login
exports.login = async(req,res) =>{
    console.log("Inside login function");
    const {email,password} = req.body
    console.log(email,password);
    //connect with mongodb
    try{
        //check email is present in db or not
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //user can login
            //generate token to authorise
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
            res.status(200).json({
                existingUser,
                token
            })
        }else{
            //incorrect password/email
            res.status(404).json("Invalid Email or Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}


//update profile
exports.editUser = async (req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profileImage} = req.body
    const profile = req.file ? req.file.filename : profileImage
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}