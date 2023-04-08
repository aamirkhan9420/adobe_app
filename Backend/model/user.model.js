const mongoose=require('mongoose')
userSchema=mongoose.Schema({
 name:{ type:String,require:true,min: 1, max: 50},
 email:{ type:String,require:true},
 bio:{ type:String,"minimum":0,"maximum":200},
 
},{ timestamps: true }),

UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}



// id (unique identifier)
// name (string, 1-50 characters)
// email (string, valid email format)
// bio (optional string, 0-200 characters)
// created_at (timestamp, automatically set when the user is created)
// updated_at (timestamp, automatically updated when the user is updated)
