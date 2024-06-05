
const mongoose=require("mongoose")

const likePost=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true,
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }

},{timestamps:true});

module.exports=mongoose.model("like",likePost);