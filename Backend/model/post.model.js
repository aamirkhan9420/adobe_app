const mongoose=require('mongoose')
postSchema=mongoose.Schema({
  user_id:{type:String,require:true},
  content:{ type:String,"minimum":1,"maximum":300},
  likes:{type:Number}
 
},{ timestamps: true }),

PostModel=mongoose.model("post",postSchema)
module.exports={PostModel}






// id (unique identifier)
// user_id (foreign key referencing the User model)
// content (string, 1-300 characters)
// created_at (timestamp, automatically set when the post is created)
// updated_at (timestamp, automatically updated when the post is updated)
// likes (integer, non-negative)