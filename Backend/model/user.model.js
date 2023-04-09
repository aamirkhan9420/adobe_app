const mongoose=require('mongoose')
userSchema=mongoose.Schema({
 name:{ type:String,require:true,minlength: 1, maxlength: 50},
 email:{ type:String,require:true},
 bio:{ type:String,minlength:0,maxlength:200},
 password:{type:String,require:true}
},{ timestamps: true }),

UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}
