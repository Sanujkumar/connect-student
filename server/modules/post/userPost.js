const mongoose=require("mongoose")
var aggregatePaginate=require("mongoose-aggregate-paginate-v2")

const postSchema=new mongoose.Schema({
  
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    
    thumbnail:{
        type:String,
        
    },
    tag:{
        type:[String],
       
    },
    
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
});

postSchema.plugin(aggregatePaginate);

module.exports=mongoose.model("post",postSchema);