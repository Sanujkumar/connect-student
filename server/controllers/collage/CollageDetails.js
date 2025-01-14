const Collage=require("../../modules/user/Collagedetail");
require("dotenv").config();
const User=require("../../modules/user/User")
const collageSchema=require("../../modules/collage/collageDetails")
const collageBranch=require("../../modules/collage/collagebBranch")
const collageHostal=require("../../modules/collage/collageHostal");
const { uploadImageToCloudinary } = require("../../utils/imageUploader");
const collageDetails = require("../../modules/collage/collageDetails");

exports.updateCollageDetails=async (req,res)=>{
    try{
        const {collageName,rejno,rollno,year,semester,branch,
            universityName, 
             fatherName,
            policeStations,
            dist,
            state,
            pincode,
            country,
            bloodgroup,
                                                    }=req.body;
        //getting id from user
        const id=req.user.id;
        const userDetails=await User.findById(id);
        console.log("userdetails",userDetails.collageinfo)
        const coll_id=userDetails.collageinfo
       const collageDetails=await Collage.findById(coll_id)

       console.log(collageDetails)
        //validation
        if(!collageDetails){
            return res.status(402).json({
                message:"collage details is not able to find",

            })
        }
         //update collage field
       const responces=  await Collage.findByIdAndUpdate({_id:coll_id},{
            collageName:collageName,
            rejno:rejno,
            branch:branch,
            rollno:rollno,
            year:year,
            semester:semester,
            universityName:universityName,
            fatherName:fatherName,
            dist:dist,
            state:state,
            pincode:pincode,
            policeStations:policeStations,
            country:country,
            bloodgroup:bloodgroup,
         })
 
      
 
         return res.status(200).json({
             message:"collage all field updated successfully",
             succcess:true,
             
         })
 
    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            message:"internal server error",
            error:error.message,
        })
    }
}

//get all student details

exports.getAllStudent=async (req,res)=>{
    try{
        //finding all student
        const student= await User.find({}).populate("collageinfo").populate("profile").exec();

        if(!student){
            res.status(401).json({
                message:"students are not avaible",
                succcess:false,
            })
        }
        res.status(200).json({
            message:"All student are ...",
            succcess:true,
            student,
        })

    }
    catch(error){
        res.status(400).json({
            message:"somthing error in finding student details",
            error:error.message,
            succcess:false,
        })
    }
}

//create collage details

exports.createCollageDetails=async (req,res)=>{
    try{
        //fetch all details from body
        
        const { collageName,about}=req.body

        console.log(collageName,about);
        // const thumbnail=req.files.file
        const thumbnail=req.files.file;
        console.log(thumbnail)
        

        if(!thumbnail){
            res.status(401).json({
                message:"file are not found",
                success:false,
            })
        }

        //validation
        if(!collageName || !about){
            res.status(401).json({
                message:"All fields are required",
                success:false
            })
        }
        const url=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)

        if(!url){
            res.status(401).json({
                message:"file has not uploaded on cloufnary",
                succcess:false,
            })
        }

        // console.log("url",url)
        // console.log("this is working here")
        const collageData=await collageSchema.create({
            collageName:collageName,
            about:about,
            imageUrl:url.secure_url,
        })
        console.log("collageData",collageData)

        

        res.status(200).json({
            message:"collage data create successfully",
            succcess:true,
            collageData,
        })

    }
    catch(error){
        res.status(400).json({
            message:"somthing issues while creating the collage details",
            succcess:false,
            error:error.message,
        })
    }
}

//updates branch details

exports.addBranchDetails=async (req,res)=>{
    try{
        console.log("request is coming..................")
        const {
            collageName,
            branchName,
            about,
            

        }=req.body

        
        const thumbnail=req.files.file
        console.log(collageName,branchName,about,thumbnail)
        const url=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
                console.log("this is the cloudnary url",url)
        if(!url){
            res.status(401).json({
                message:"file has not uploaded on cloufnary",
                succcess:false,
            })
        }
        const branchDetails=await collageBranch.create({
            branchName:branchName,
            about:about,
            
            imageUrl:url.secure_url,

        })
        const collage=await collageSchema.findOneAndUpdate({collageName:collageName},
           { branch:branchDetails},
            )

            res.status(200).json({
                message:"branch details are updated",
                succcess:true,
                collage,
            })



    }
    catch(error){
        res.status(400).json({
            message:"something error while updated branch details",
            succcess:false,
            error:error.message,
        })
    }
}

exports.addHostalDetails = async (req, res) => {
    try {
      // Destructure the forms array from the request body
      const { forms } = req.body;
  
      // Iterate over each form object
      for (const form of forms) {
        const {
          collageName,
          hostalName,
          about,
          file // Assuming you're sending file data in the request body
        } = form;
  
        // Process file data (upload to cloudinary, etc.)
        const thumbnail = file; // Assuming you've already handled file upload in middleware
        const url = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
  
        // Check if file upload was successful
        if (!url) {
          return res.status(401).json({
            message: "File has not uploaded to Cloudinary",
            success: false
          });
        }
  
        // Create collageHostal document
        const collage = await collageSchema.findOne({ collageName }); // Assuming you have collageSchema defined
        const hostalDetails = await collageHostal.create({
          hostalName: hostalName,
          about: about,
          imageUrl: url.secure_url
        });
  
        // Assign hostalDetails to collage
        collage.hostal = hostalDetails;
        await collage.save();
      }
  
      // Send response
      res.status(200).json({
        message: "Hostal details added successfully",
        success: true
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong while updating the hostal details",
        success: false,
        error: error.message
      });
    }
  };


//get all collage details
exports.getCollageDetails=async (req,res)=>{
    try{
        const collageData=await collageSchema.find({});
        const hostalData=await collageHostal.find({});
        const branchData=await collageBranch.find({});
        

        if(!collageData){
            res.status(401).json({
                message:"collage data are not avaible",
                succcess:false,
            })
        }
        res.status(200).json({
            message:"collage details are",
            succcess:true,
            collageData,
            hostalData,
            branchData
            
        })
       

    }
    catch(error){
        res.status(400).json({
            message:"collage details are not found",
            succcess:false,
            error:error.message,
        })
    }
}

//update branch details
exports.updateBranchDetails=async (req,res)=>{
    try{
        const {
            branchName,
            about,
            noOfSheet,
        }=req.body
        const thumbnail=req.files.file
        const url=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        const branchData=await collageBranch.findOneAndUpdate({branchName:branchName},
            {about:about,
            noOfSheet:noOfSheet,
            imageUrl:url.secure_url
            }
            );

            res.status(200).json({
                message:"BranchDetails updated successfully",
                succcess:true,
                branchData
            })



    }
    catch(error){
        res.status(400).json({
            message:"something error while updateBranchDetails",
            succcess:false,
            error:error.message,
        })
    }
}

//update hostal details

exports.updateHostalDetails=async (req,res)=>{
    try{
        const {
            hostalName,
            about,
            
        }=req.body
        const thumbnail=req.files.file
        const url=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        const hostalData=await collageHostal.findOneAndUpdate({hostalName:hostalName},
            {about:about,
            imageUrl:url.secure_url
            }
            );

            res.status(200).json({
                message:"HostalDetails updated successfully",
                succcess:true,
                hostalData
            })



    }
    catch(error){
        res.status(400).json({
            message:"something error while updateHostalDetails",
            succcess:false,
            error:error.message,
        })
    }
}