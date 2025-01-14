import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { setLoding } from "../../dataHouse/slice/authSlice";
import { setUser } from "../../dataHouse/slice/profileSlice";
const { GET_USER_DETAILS_API, UPDAGE_USER_PROFILE_API, UPDATE_COLLAGE_DETAILS_API } = profileEndpoints


//get user details
export function getUserDetails(token) {

  return async (dispatch) => {

    dispatch(setLoding(true));
    try {
      // dispatch(setLoding(true))
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await apiConnector("GET", GET_USER_DETAILS_API, {}, headers)
      // console.log("GET user deatils api responce .............",response);

      //validation
      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      dispatch(setUser(response.data?.userDetails))
      dispatch(setLoding(false))
      // console.log("this is from api",response.data?.userDetails)
    }
    catch (error) {

      // console.log("GET_USER_DETAILS API ERROR............", error)
      dispatch(setLoding(false))
      toast.error("Could Not Get User Details")


    }

  }
}


//update profile details
export function updateProfileDetails(data, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoding(true))
    try {
      console.log(token, data)
      const headers = { 'Authorization': `Bearer ${token}` };
      const userDetails = await apiConnector("put", UPDAGE_USER_PROFILE_API, data, headers);
      console.log("update successfully user data", userDetails)
      navigate("/profile/infolink")
    } catch (err) {
      console.log("something is issue while upadating the user details", err.message)
    }
    dispatch(setLoding(false))
  }
}

//update collage details
export function updateCollageDetails(data, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoding(true))

    try {
      console.log(token, data)
      const headers = { 'Authorization': `Bearer ${token}` };
      const collageDetails = await apiConnector("put", UPDATE_COLLAGE_DETAILS_API, data, headers);
      console.log("update successfully user data", collageDetails)
      navigate("/profile/collageinfo");
    } catch (err) {
      console.log("something is issue while upadating the collage details", err.message)
    }
    dispatch(setLoding(false))
  }
}