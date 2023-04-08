const express = require("express")
const { PostModel } = require("../model/post.model")
postRoute=express.Router()

postRoute.post("/",async(req,res)=>{
    let post=req.body
    console.log(post)
    let newPost=new PostModel(post)
    await newPost.save()
    res.send({ "msg": "new post added" })
})

postRoute.get("/:id",async(req,res)=>{
    let id=req.params.id
    let Post=await PostModel.findOne({ _id:id })
       res.send({ "msg":Post})
})

postRoute.put("/:id",async(req,res)=>{
    let id=req.params.id
    let data=req.body     
    let Post=await PostModel.findByIdAndUpdate({ _id:id },data)
          res.send({ "msg":"Post updated successfully"})
})

postRoute.delete("/:id",async(req,res)=>{
    let id=req.params.id
    await PostModel.findByIdAndDelete({ _id:id })
       res.send({ "msg":"Post deleted successfully"})
  
})

postRoute.post("/:id/like",async(req,res)=>{
    let id=req.params.id   
    let {likes}=await PostModel.findOne({ _id:id })
    let newlike=likes+1
    await PostModel.findByIdAndUpdate({ _id:id },{likes:newlike})
          res.send({ "msg":"Post liked "})
})

postRoute.post("/:id/unlike",async(req,res)=>{
    let id=req.params.id 
    let {likes}=await PostModel.findOne({ _id:id })
    let newunlike;
    if(likes>=1){
        newunlike=likes-1
    }else{
      newunlike=0
    }
    await PostModel.findByIdAndUpdate({ _id:id },{likes:newunlike})
    res.send({ "msg":"Post unliked "})
})

postRoute.get("/analytics/posts",async(req,res)=>{
    let UserList=await PostModel.find()
    res.send({"msg":UserList})
})

module.exports={postRoute}