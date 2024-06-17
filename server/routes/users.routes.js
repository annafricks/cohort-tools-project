const router = require("express").Router();


const jwt= require("jsonwebtoken")
const Users = require("../models/users.model.js");
const isAuth=require("../middleware/jwt.middleware.js")


router.get("/:userId", async(req,res)=>{
    try{
        const {userId}=req.params
        const singleUser= await Users.findById(userId)

        res.status(200).json(singleUser)
    }catch(error){
        console.log("single user error", error)
        res.status(500).json(error)
    }
})
module.exports=router