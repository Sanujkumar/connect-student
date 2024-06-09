const Post=require("../../modules/post/userPost");
const User=require("../../modules/user/User");
const {uploadImageToCloudinary}=require("../../utils/imageUploader");
const like=require("../../modules/post/like")
const fs=require("node:fs")
require("dotenv").config();
const Comment=require("../../modules/post/comment");
const  mongoose  = require("mongoose");

exports.createPost=async (req,res)=>{

    try{
    
    const desc=req.body.desc;
    const id=req.user.id;
  
   const thumbnail=req.files.file;

//    console.log("desc and thumbnail are ",desc,thumbnail);
    //validation
    if(!desc){
        return res.status(400).json({
            success:false,
            message:'you have to add what want to post',

        });
    }
    // console.log("user id",id);
    const userDetails=await User.findById(id);
    // console.log("User details",userDetails);
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:'user details is not found',
        });
    }
  
    //upload image to Cloudinary
    const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
   //console.log(thumbnailImage)

    //cleaning the file from server
    fs.unlinkSync(thumbnail.tempFilePath)
    
    //create db entry for new post
    const newPost=await Post.create({
        description:desc,
        instructor:id,
        thumbnail:thumbnailImage.secure_url,
    });

    //add a new post to the user schema of user
    await User.findByIdAndUpdate(
        {_id:userDetails._id},
       { 
         $push: {
            postdetail:newPost._id,
        }
    },
        {new:true},
    );

    //return resp
    return res.status(200).json({
        success:true,
        message:'post created successfully',
        data:newPost,
    });
 }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'failed to create post',
            error:error.message,
        })
    }

}



//get all post handler function
exports.showAllPost = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const userId = req.user.id;

        const allPosts = await Post.aggregate([
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post",
                    as: "total_like"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "instructor",
                    foreignField: "_id",
                    as: "user_details"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "all_comment"
                }
            },
            {
                $addFields: {
                    total_like_count: { $size: "$total_like" },
                    total_comments: { $size: "$all_comment" },
                    post_by: { $arrayElemAt: ["$user_details", 0] },
                    isLiked: {
                        $in: [new mongoose.Types.ObjectId(userId), "$total_like.likedBy"]
                    }
                }
            },
            {
                $project: {
                    "post_by.firstName": 1,
                    "post_by.image": 1,
                    date: 1,
                    total_like_count: 1,
                    thumbnail: 1,
                    description: 1,
                    total_comments: 1,
                    isLiked: 1
                }
            }
        ]);

        if (!allPosts.length) {
            return res.status(200).json({
                success: false,
                message: 'There are no posts available at the moment',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Data for all posts fetched successfully',
            data: allPosts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Cannot fetch post data',
            error: err.message,
        });
    }
}






//liking the post 
exports.likePost=async(req,res)=>{
    try{
    
        const {post_id}=req.body;
        const user_id=req.user.id;
        const conditions={post:post_id,likedBy:user_id}
        // console.log("user details are ",conditions)
        const response = await like.findOne({ $and: [{ post: post_id }, { likedBy: user_id }] });
        // console.log("user all ready liked",user_id)
        if(!response){
            const createdLike=await like.create(conditions)
            return res.status(200).json({
                success:true,
                message:"post like Successfully",
                createdLike,
            })
        }else{
            const removeLikes=await like.findOneAndDelete(conditions)

            return res.status(200).json({
                success:true,
                message:"post dislike Successfully",
                removeLikes,
            })
        }

    }
    catch(err){
        // console.log(err);
        return res.status(400).json({
            success:false,
            message:'post does not liked',
            error:err.message,
        })
    }
}

//comment on a post

exports.commentOnPost=async(req,res)=>{
    try{
        const{post_id}=req.body
        const content=req.body.comments;
        const user_id=req.user.id
        

        if(!content){
            return res.status(300).json({
                message:"something is issue while commenting",
                success:false,
            })
        }

        const createComment=await Comment.create({
            content:content,
            user:new mongoose.Types.ObjectId(user_id),
            post: new mongoose.Types.ObjectId(post_id)

        },
    )

    // Fetch the comment with user details
    const commentWithUser = await Comment.aggregate([
        { $match: { _id: createComment._id } },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $addFields:{
                user: { $arrayElemAt: ["$userDetails", 0] }
            }
        },
        {
            $project: {
                content: 1,
                "user.image": 1,
                "user.firstName": 1,
                 // Assuming userDetails is an array
            }
        }
    ]);

    return res.status(200).json({
        message: "Comment added successfully",
        success: true,
        data: commentWithUser[0], // Return the first (and only) result
    });


    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'err while commenting on post',
            error:err.message,
        })
    }
}


//get the comment

exports.getCommnet=async(req,res)=>{
    try{
        const post_id=req.body.postId;
        const page=1, limit=10;
        
        if(!post_id){
            return res.status(401).json({
                message:"post id is missing from the request",
                success:false,
            })
        }
        const getAllComment=await Comment.aggregate([
            {
                $match:{
                    post: new mongoose.Types.ObjectId(post_id)
                }
            },
            {
                $skip: (page-1)*limit
            },
            {
                $limit: limit,
            },
            {
                $lookup:{
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "commentTo"
                }
            },
            {
                $addFields:{
                        user:{
                            $arrayElemAt:["$commentTo",0]
                        }
                }
            },
           
            {
                $project:{
                    content: 1,
                    "user.firstName": 1,
                    "user.image": 1,

                }
            }

        ]);

        return res.status(200).json({
            message:"successfully get the comment",
            success:true,
            data:getAllComment,
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'err while commenting on post',
            error:err.message,
        })
    }
}