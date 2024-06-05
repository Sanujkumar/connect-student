const mongoose=require("mongoose")
var aggregatePaginate=require("mongoose-aggregate-paginate-v2")


const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            
        },
        post: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "post"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

commentSchema.plugin(aggregatePaginate);
module.exports=mongoose.model("Comment",commentSchema);