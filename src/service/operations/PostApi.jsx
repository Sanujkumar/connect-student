import { setLoding } from '../../dataHouse/slice/authSlice'
import { toast } from 'react-toastify'
import { apiConnector } from "../apiconnector"
import { postendpoints } from "../apis"
import { setClose } from "../../dataHouse/slice/authSlice"
import { data } from '../../component/data/AllStudent'
import { setPostdata } from '../../dataHouse/slice/postSlice'
const {
  CREATEPOST_API,
  GETALLPOST_API,
  GETRATINGOFPOST_API,
} = postendpoints
//to store the post 
let result = []

export  function getAllPost(token) {
  return async(dispatch)=>{

  
 
  try {
    const headers = { 'Authorization': `Bearer ${token}` };

    const responce = await apiConnector("GET", GETALLPOST_API, {}, headers);


    //validation
    if (!responce.data.success) {
      throw new Error(responce.data.message)
    }

    result = responce.data.data;
    // console.log("this is from post api ",result)
    result.forEach((e)=>{
      dispatch(setPostdata(e))
    })
    
    // return result;

  }
  catch (error) {
    toast.success("something is issue while fetching the post")
    console.log("get error in fetching the post ", error.message)

  }
  }
}


//create post

export function createPost(formData, navigate, token) {
  return async (dispatch) => {
    dispatch(setLoding(true))

    try {
      const online = navigator.onLine
      console.log("online or not", online)
      if (!online) {
        toast.error("internet connections issue")
        dispatch(setLoding(false))
        navigate("/internet")
      }

      console.log("from create post api", formData.desc,formData.file);
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
      
      
      const response = await apiConnector("POST", CREATEPOST_API, formData, headers);
      dispatch(setLoding(false))
      console.log("post API Response...", response.data.data);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      

      dispatch(setPostdata(response?.data.data))
      toast.success("Post created successfully");
      dispatch(setClose(false))
      
      
    }
    catch (error) {
      console.log("Post API error...", error.message);
      dispatch(setLoding(false))
      toast.error("something")

    }

  };
}


export default function RatingAPost(like, dislike, share, postId, token) {
  return async (dispatch) => {
    dispatch(setLoding(true))
    try {
      // console.log(like,dislike,share,postId,token)
      const headers = { 'Authorization': `Bearer ${token}` };
      const RatingOf_Post = await apiConnector("post", GETRATINGOFPOST_API,
        {
          like, dislike, share, postId
        }, headers);
      
      let dataweb={"name":"roshan","town":"sit"}
      const newSocket = new WebSocket('ws://localhost:2000/');
      newSocket.onopen = () => {
        console.log('Connection established');
        newSocket.send(JSON.stringify(dataweb));
      }
      newSocket.onmessage = (message) => {
        console.log('Message received:', message.data);
      }
      // dispatch(setlike(RatingOf_Post.data.ratingReview.like))
      // dispatch(setdislike(RatingOf_Post.data.ratingReview.dislike))
      // dispatch(setShare(RatingOf_Post.data.ratingReview.share))
      newSocket.close();
      // console.log(RatingOf_Post)
    }
    catch (err) {
      console.log(err.message)
    }
  }
}