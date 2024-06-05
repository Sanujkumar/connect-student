const jwt=require("jsonwebtoken");
require("dotenv").config();

const User=require("../modules/user/User");

//auth
exports.auth=(req,res,next)=>{
    try{
        //extract the token
        const token=  req.cookies.token || req.body.token || req.headers.authorization.split(' ')[1];

         //if token is missing the return resp
         console.log("token is this",token)
         if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            })
         }   
     //   verification of token
    //  console.log("this is my security key",process.env.JWT_SECRET )
         try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            // console.log( "after verification of token", decode);
            req.user=decode;
            // console.log(decode.id)
         }   
         catch(error){
            //verification issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            })
         }   
         next(); 
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'something wend wrong while validation the token',
        })
    }
};




//collage
// exports.isCollage=(req,res,next)=>{
//             //need to change bs is not good algo for our project
//     try{
//         if(req.user.accountType !=="Collage"){
//             return res.status(402).json({
//                 success:false,
//                 message:'this is not procted route for collage',
//             })
//         }
//         next();
//     }
//     catch(error){
//         res.status(402).json({
//             success:false,
//             message:'user role is not verify'
//         })
//     }
// }