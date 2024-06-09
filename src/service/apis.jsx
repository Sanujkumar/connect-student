
const BASE_URL="http://localhost:2000/api/v1"
// const BASE_URL="https://connect-student.onrender.com/api/v1"
// const BASE_URL = process.env.REACT_APP_BASE_URL

//auth endpoint

export const endpoints={
    
    SENDOTP_API:BASE_URL+ "/auth/sendOTP",
    SIGNUP_API:BASE_URL+ "/auth/signUp",
    LOGIN_API:BASE_URL +"/auth/login",
    RESETPASSWORD_API:BASE_URL+"/auth/changePassword",
    RESETPASSWORDTOKEN_API:BASE_URL + "/auth/reset-password-token",
    REFRESH_PAGE:BASE_URL+"/auth/refresh_page",
    UPDATE_PROFILE_PHOTO:BASE_URL+"/auth/updatePhoto"
}

//profile endpoint

export const profileEndpoints={

    GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
    UPDAGE_USER_PROFILE_API:BASE_URL +"/profile/updateProfile",
    UPDATE_COLLAGE_DETAILS_API:BASE_URL + "/profile/updateCollageDetails",
    
}
//collage api end points

export const collageEndpoints={
    GET_ALL_STUDENT_API:BASE_URL+"/profile/getAllStudent",
    GET_ALL_COLLAGE_PROFILE_API:BASE_URL + "/profile/getCollageDetails",
    CREATE_COLLAGE_PROFILE:BASE_URL + "/profile/createCollageDetails",
    ADD_BRANCH_DETAILS:BASE_URL + "/profile/addBranchDetails",
    ADD_HOSTEL_DETAILS:BASE_URL + "/profile/addHostalDetails",
}
//post append[point]  verified

export const postendpoints={
    CREATEPOST_API:BASE_URL +"/post/createPost",
    GETALLPOST_API:BASE_URL + "/post/showAllPost",
    GETRATINGOFPOST_API:BASE_URL+ "/post/RatingAPost",
    LIKEAPOST_API:BASE_URL + "/post/likePost",
    COMMENTONAPOST_API:BASE_URL + "/post/commentOnPost", 
    GETALLCOMMENT_API:BASE_URL + "/post/getCommnet"
}

//settings page api
export const settingsEndpoints={
    UPDATE_PROFILE_PICTURE_API:BASE_URL + "/Profile/updateProfilePoto",
    UPDATE_PROFILE_API:BASE_URL +"/profile/updateProfile",

   // CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}