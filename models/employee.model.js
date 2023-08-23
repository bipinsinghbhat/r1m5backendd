const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstName:String,
    lastName: String,
    email:String,
    department:{
       type:String,
       enum:["Tech","Marketing","Operations"]
    } ,
    salary:Number, 
    userID:String
 },
  { versionKey: false }
);

const employeeModel = mongoose.model("employeedetails", employeeSchema);

module.exports = { employeeModel };