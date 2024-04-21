const cloudinary = require("cloudinary").v2;
const fs=require("node:fs")
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {

    try {
        const option = { folder };
        console.log("this is our folder name",folder)
        if (height) {
            option.height = height;
        }
        if (quality) {
            option.quality = quality;
        }
        option.resource_type = "auto";
        
        // console.log("this is our options name",option)
        return await cloudinary.uploader.upload(file.tempFilePath, option);
    }
    catch (err) {
        console.log(err.message)
        
        fs.unlinkSync(file.tempFilePath)
        console.log("temp file path clear successfully")
    }

}