const mongoose=require('mongoose')
userSchema=mongoose.Schema({
 name:{ type:String,require:true,min: 1, max: 50},
 email:{ type:String,require:true},
 bio:{ type:String,"minimum":0,"maximum":200},
 
},{ timestamps: true }),

UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}
