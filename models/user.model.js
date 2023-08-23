const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
     email:String,
     password:String,
     confirmpassword:String
},{
    versionKey:false
})

const userModel=new mongoose.model("userdetails",userSchema)

module.exports={
    userModel
}