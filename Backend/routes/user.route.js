const express = require("express")

let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")
const { UserModel } = require("../model/user.model")
const userRoute = express.Router()
userRoute.post("/",async(req,res)=>{
    let user=req.body
    console.log(user)
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
       res.send({ "msg":"user information updated successfully"})
  
})

userRoute.delete("/:id",async(req,res)=>{
    let id=req.params.id
    let User=await UserModel.findByIdAndDelete({ _id:id })
       res.send({ "msg":"User deleted successfully"})
  
})

module.exports = { userRoute }
