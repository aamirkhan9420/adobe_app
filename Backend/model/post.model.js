const mongoose=require('mongoose')
postSchema=mongoose.Schema({
  user_id:{type:String,require:true},
  content:{ type:String,"minimum":1,"maximum":300},
  likes:{type:Number}

 },{ timestamps: true }),

PostModel=mongoose.model("post",postSchema)
module.exports={PostModel}

