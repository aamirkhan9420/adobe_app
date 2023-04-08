const express = require("express")
const { UserModel } = require("../model/user.model")
const userRoute = express.Router()

userRoute.post("/",async(req,res)=>{
    let user=req.body
    let newUser=new UserModel(user)
    await newUser.save()
    res.send({ "msg": "new user added" })
  
})
userRoute.get("/:id",async(req,res)=>{
    let id=req.params.id
    let User=await UserModel.findOne({ _id:id })
       res.send({ "msg":User})
  
})

userRoute.put("/:id",async(req,res)=>{
    let id=req.params.id
    let data=req.body
    let User=await UserModel.findByIdAndUpdate({ _id:id },data)
       res.send({ "msg":"User information updated successfully"})
  
})

userRoute.delete("/:id",async(req,res)=>{
    let id=req.params.id
    let User=await UserModel.findByIdAndDelete({ _id:id })
       res.send({ "msg":"User deleted successfully"})
  
})

userRoute.get("/analytics/users",async(req,res)=>{
    let UserList=await UserModel.find()
    res.send({"msg":UserList})
})

module.exports = { userRoute }
