const express=require("express");
const router=express.Router();

//Import the required controller and milddleware function

const {
    login,
    signUp,
    sendOTP,
    changePassword,
    updateProfilePhoto,updateBanner
}=require("../controllers/Auth");

const {resetPasswordToken,
    resetPassword
}=require("../controllers/profilecontrollers/ResetPassword");
const {findDetails}=require("../middlewares/redisServer")
const {auth}=require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Route for user login
router.post("/login",login);

//Route for user signup
router.post("/signUp",signUp);

//Route for user sendOtp
router.post("/sendOTP",sendOTP);

//Route for user changePassword
router.post("/changePassword",changePassword);
router.post("/updatePhoto",auth,updateProfilePhoto)
router.post("/updateBanner",auth,updateBanner);



// ***********************************************************************************
//                                     Reset password
// ***********************************************************************************

router.post("/resetPasswordToken",resetPasswordToken);

router.post("/resetPassword",resetPassword);
// Export the router for use in the main application

//when refresh the page it will call
router.get("/refresh_page",auth,findDetails)
module.exports=router;