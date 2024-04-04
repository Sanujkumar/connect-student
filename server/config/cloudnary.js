const cloudnary=require("cloudinary");


exports.CloudnaryConnect=()=>{
    try{
        cloudnary.v2.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
            secure: true,
        });
    }
    catch(error){
            
        console.log(error);
    }
}