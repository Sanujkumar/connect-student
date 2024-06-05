import { apiConnector } from "../apiconnector";
import { collageEndpoints } from "../apis";


const {
    GET_ALL_STUDENT_API,
    GET_ALL_COLLAGE_PROFILE_API,
    CREATE_COLLAGE_PROFILE,ADD_BRANCH_DETAILS,ADD_HOSTEL_DETAILS
}=collageEndpoints

export async function getAllCollageStudent(){

    try{
        const allStudent= await apiConnector("GET",GET_ALL_STUDENT_API);

        if(!allStudent){
            console.log("student are not available")
        }
        console.log("all student api response is ",allStudent)
        return allStudent.data;
    }
    catch(error){
        console.log(`getting error in fetching collage student details api ${error}`)
    }
}

//collage profile details api
export async function getCollageProfileDetails(token){
    try{
        const headers = {'Authorization': `Bearer ${token}`};
        const allCollageData=await apiConnector("GET",GET_ALL_COLLAGE_PROFILE_API,{},headers)

        if(!allCollageData){
            console.log("collage profile are not visible")

        }
        return allCollageData.data;
    }
    catch(error){
        console.log(`getting error in fetching collage profile details api ${error}`)
    }
}

//to create the profile of collage

export async function createCollageProfile(token,formData,navigate){
    try{
        const headers = {'Authorization': `Bearer ${token}`};
        console.log("data of collage profile is",formData.file)

        const response=await apiConnector("post",CREATE_COLLAGE_PROFILE,{
            file:formData.file,
            about:formData.about,
            collageName:formData.collageName,
        },headers);

        console.log("this is response of createCollageProfile",response)
        if(response){
            navigate("/collage/add_branch_details")
        }
        return response;

    }
    catch(err){
        console.log("error while creating the collage profile")
    }
}

//to add the branch details 
export async function addBranchDetails(token,body_data,navigate){
    try{
        const headers = {'Authorization': `Bearer ${token}`};
        const response=await apiConnector("post",ADD_BRANCH_DETAILS,body_data,headers);

        console.log("this is response of createCollageProfile",response)
        if(response){
            navigate("/collage/add_hostel_details")
        }

    }
    catch(err){
        console.log("error while creating the collage profile")
    }
}

//to add the hostel details 
export async function addHostelDetails(token,forms,navigate){
    try{
        const headers = {'Authorization': `Bearer ${token}`};
        console.log("token is here",token);
        const response=await apiConnector("put",ADD_HOSTEL_DETAILS,forms,headers);

        console.log("this is response of createCollageProfile",response)
        // if(response){
            
        // }
        return response;

    }
    catch(err){
        console.log("error while creating the collage profile",err)
    }
}