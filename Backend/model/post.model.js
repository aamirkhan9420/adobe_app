const mongoose=require('mongoose')
postSchema=mongoose.Schema({
  
  user_id:{type:String,require:true},
  content:{ type:String,minlength:1,maxlength:300},
  likes:{type:"number"}

 },{ timestamps: true }),

PostModel=mongoose.model("post",postSchema)
module.exports={PostModel}

