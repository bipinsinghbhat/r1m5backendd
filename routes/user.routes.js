const express=require("express")
const { userModel } = require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
      const {email,password,confirmpassword}=req.body
 
       try {
          const usersdetail=await userModel.findOne({email})
        
          if(usersdetail){
              return res.json({msg:"User Already Exists Login"})
          }

          bcrypt.hash((password,confirmpassword),5,(err,hash)=>{
            if(err){
                 return res.json({msg:"Something went wrong in bcrpt"})
            }
              
            const usersdetail=new userModel({email,password:hash,confirmpassword:hash});
            usersdetail.save()
            res.json({msg:"User has been registered",usersdetail})
          })
    }
      catch(error){
        res.status(400).json({error:error.message})
      }
})


userRouter.post("/login",async(req,res)=>{
      const {email,password}=req.body
      try {
          const usersdetail=await userModel.findOne({email})
           
        if(!usersdetail){
              return res.json({msg:"SignIn first"})
        }

        bcrypt.compare(password,usersdetail.password,(err,result)=>{
            if(result){
        let token=jwt.sign({userID:usersdetail._id},"masai")
        res.json({msg:"Logged in",token})
       // localStorage.setItem("tok",token)
            }
            else{
                res.json({mag:"User does not exist"})
            }
        })


      } catch (error) {
        res.json({err:"something went wrong"})
      }
})











module.exports={
    userRouter
}