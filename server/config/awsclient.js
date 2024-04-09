const S3client=require("@aws-sdk/client-s3")
require("dotenv").config();
const s3Client=new S3client({
    region:"ap-south-1",
    Credentials:{
        accessKeyId:process.env.Access_key,
        secretAccessKey:process.env.Secret_access_key,
    },
});