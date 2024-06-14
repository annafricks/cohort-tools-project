
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const User = require("../models/users.model.js")
const express=require("express")
const isAuth=require("../middleware/jwt.middleware.js")
const router = express.Router();
const mongoose=require("mongoose")

const salts=10

router.post("/signup", async(req,res)=>{
    try{
        const{email, username, password}= req.body
        if(!email||!username||!password){
            return res.status(400).json({message:"Please provide email, username, and password"})
        }

        const user = await User.findOne({
            $or: [{email}, {username}]
        })

        if(user){
            return res.status(400).json({message: "Username Taken"})
        }
        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if(!emailRegex.test(email)){
            res.status(400).json({message:"Invalid email"})
            return
        }
        const passwordRegex= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        if(!passwordRegex.test(password)){
            res.status(400).json({message:"Password must have at least 8 characters and contain at least one number, one lowercase, one uppercase letter and a special character."})
            return
        }

        const salt = await bcrypt.genSalt(salts)
        const hashedPassword= await bcrypt.hash(password, salt)
        const createdUser= await User.create({
            email,
            username,
            password: hashedPassword,
        })
        delete createdUser._doc.password
        res.status(201).json(createdUser)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

router.post("/login", async(req, res)=>{
    try{
        const {email, username, password}= req.body
        if (!(email|| username)||!password){
            return res.status(400).json({message:"Please provide email or username, and password"})
        }

        const user = await User.findOne({$or:[{email},{username}]})
        if(!user){
            return res.status(401).json({message: "User does not exist"})
        }
        const passwordCheck=await bcrypt.compare(password, user.password)
        if (!passwordCheck){
            return res
            .status(401).json({message:"email/username or password is incorrect"})
        }

        // check if ths is waht doc is called
        delete user._doc.password

        const authToken=jwt.sign({
            payload:{user,customProp:"idk just testing"}},
            process.env.TOKEN_SIGN_SECRET,
            {
                algorithm:"HS256",
                expiresIn:"24h",
            }
        )
        res.json({user, authToken}) 
    }catch(error){
        console.log(error);
    res.status(500).json(error)
    }
})


router.get("/verify", isAuth, async (req, res) => {
    try {
        console.log("Hello, this is the logged user in verify ->", req.user);
        res.json({message: "User is logged in.", user: req.user});
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;