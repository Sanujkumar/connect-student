import { setLoding } from '../../dataHouse/slice/authSlice'
import { toast } from 'react-toastify'
import { apiConnector } from "../apiconnector"
import { postendpoints } from "../apis"
import { setClose } from "../../dataHouse/slice/authSlice"
import  io from 'socket.io-client'
const socket = io("http://localhost:10000/");
const {
  CREATEPOST_API,
  GETALLPOST_API,
  GETRATINGOFPOST_API,
} = postendpoints


export async function getAllPost(token) {
  let result = []
  try {
    const headers = { 'Authorization': `Bearer ${token}` };

    const responce = await apiConnector("GET", GETALLPOST_API, {}, headers);


    //validation
    if (!responce.data.success) {
      throw new Error(responce.data.message)
    }

    result = responce.data.data;

    return result;

  }
  catch (error) {
    toast.success("something is issue while fetching the post")
    console.log("get error in fetching the post ", error.message)

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

      console.log("from create post api", formData);
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
      //write the code here for emiting the message
      // socket.on("connect", () => {
        // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        // socket.on("hello", (arg) => {
        //   toast.success(arg);
        //   console.log(arg); // world
        // });
        // socket.emit("hello1","this is post data file");
      // });
      // socket.emit(`hello1","this is post data file`);

      const response = await apiConnector("POST", CREATEPOST_API, formData, headers);
      dispatch(setLoding(false))
      console.log("post API Response...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

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

      // dispatch(setlike(RatingOf_Post.data.ratingReview.like))
      // dispatch(setdislike(RatingOf_Post.data.ratingReview.dislike))
      // dispatch(setShare(RatingOf_Post.data.ratingReview.share))

      // console.log(RatingOf_Post)
    }
    catch (err) {
      console.log(err.message)
    }
  }
}