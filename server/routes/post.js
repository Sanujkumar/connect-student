const express=require("express");
const router=express.Router();


const {auth}=require("../middlewares/auth");
const {
    createPost,
    showAllPost,
    getCommnet,
    commentOnPost,
    likePost
}=require("../controllers/postcontrollers/post");
const {RatingAPost}=require("../controllers/postcontrollers/ratingAPost")



router.post("/createPost",auth,createPost);
router.get("/showAllPost",auth,showAllPost);
router.post("/RatingAPost",auth,RatingAPost);
router.post("/likePost",auth,likePost);
router.post("/commentOnPost",auth,commentOnPost);
router.get("/getCommnet",auth,getCommnet);



module.exports=router;