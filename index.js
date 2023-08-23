const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { employeeRouter } = require("./routes/employee.routes")

const app=express()

app.use(express.json())
const cors=require("cors")
app.use(cors())

app.use("/users",userRouter)
app.use("/employees",employeeRouter)

app.get("/",async(req,res)=>{
   res.status(200).send("Welcome to home page")
 })

app.listen(4500,async()=>{
   try {
      await connection
      console.log("connected to the Db")
      console.log("server running on servere 4500")
   } catch (error) {
      console.log(error)
      console.log("something went wrong")
   }
})

