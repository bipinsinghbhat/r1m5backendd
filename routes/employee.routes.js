const express=require("express")
const employeeRouter=express.Router()

const { employeeModel } = require("../models/employee.model")

const { auth } = require("../middlewares/auth.middleware")



employeeRouter.use(auth)


employeeRouter.post("/create",async(req,res)=>{
      try {
       const employeedetails=new employeeModel(req.body)
       await employeedetails.save()
       res.json({msg:"New employee has been added",employeedetails:req.body})
      } catch (error) {
       res.json({error:error.message})
      }
   }) 

// employeeRouter.get("/",async(req,res)=>{
//      try {
//            const employeedetails=await employeeModel.find()
//            res.send(employeedetails)
//      } catch (error) {
//         res.json({error:"somethig went wrong"})  
//      }
// })




employeeRouter.get("/",async(req,res)=>{
      const page=parseInt(req.query.page)||1
      const Page_Size=5

     try {
           const totalEmployees=await employeeModel.countDocuments()
           const totalPages=Math.ceil(totalEmployees/Page_Size)

           const employees=await employeeModel.find().skip((page-1)*Page_Size).limit(Page_Size)
           res.status(200).send({
                 currentPage:page,
                 totalPages:totalPages,
                 employees:employees
           })

     } catch (error) {
           res.status(500).send({ error: "An error occurred while fetching employees" });
     }
})



employeeRouter.get("/filter",async(req,res)=>{
      const department=req.query.department
 
        const emp=await employeeModel.find()

      if (!department) {
            return res.status(400).json({ emp });
        }

      try {
   const employeedetails=await employeeModel.find({department})
      res.json(employeedetails)

    
      } catch (error) {
            res.status(400).send({error:error.message}) 
      }
})



employeeRouter.get("/sortinc",async(req,res)=>{
      try {
            const employeedetails=await employeeModel.find().sort({salary:1})
            res.json(employeedetails)
      } catch (error) {
            res.status(400).send({error:error.message})
      }
})

employeeRouter.get("/sortdec",async(req,res)=>{
      try {
            const employeedetails=await employeeModel.find().sort({salary:-1})
            res.json(employeedetails)
      } catch (error) {
            res.status(400).send({error:error.message})
      }
})

employeeRouter.patch("/:id",async(req,res)=>{
      const {id} = req.params
      try {
       const Updatedemp=await employeeModel.findByIdAndUpdate({_id:id},req.body)
       res.status(200).send({msg:"Employee Data has been Updated",Updatedemp})
      } catch (error) {
       res.status(400).send({error:error.message})
      }
 })



 employeeRouter.delete("/:id", async (req, res) => {
      const  id  = req.params.id;
      try {
          const deletedemp = await employeeModel.findByIdAndDelete({_id:id});
          if (deletedemp) {
              res.status(200).send({ msg: "Employee Data has been deleted", deletedemp });
          } else {
              res.status(404).send({ msg: "Employee not found" });
          }
      } catch (error) {
          res.status(400).send({ error: error.message });
      }
  });
  
 
 employeeRouter.get("/search", async (req, res) => {
      const { firstName } = req.query;
  
      try {
          const employees = await employeeModel.find({ firstName });
          if (employees.length > 0) {
              res.status(200).send({ msg: "Employees found", employees });
          } else {
              res.status(404).send({ msg: "No employees found with the given first name" });
          }
      } catch (error) {
          res.status(400).send({ error: error.message });
      }
  });
 
  
  
  
  
  
  




















module.exports={
      employeeRouter
}