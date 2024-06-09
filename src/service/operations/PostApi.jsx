import { setLoding } from '../../dataHouse/slice/authSlice'
import { toast } from 'react-toastify'
import { apiConnector } from "../apiconnector"
import { postendpoints } from "../apis"
import { setClose } from "../../dataHouse/slice/authSlice"
import { data } from '../../component/data/AllStudent'
import { setPostdata } from '../../dataHouse/slice/postSlice'
import { setComment } from '../../dataHouse/slice/postSlice'
import { Hearts } from 'react-loader-spinner'
const {
  CREATEPOST_API,
  GETALLPOST_API,
  GETRATINGOFPOST_API,
  LIKEAPOST_API,
  COMMENTONAPOST_API,
  GETALLCOMMENT_API
} = postendpoints
//to store the post 
let result = []

export function getAllPost(token) {
  return async (dispatch) => {



    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const responce = await apiConnector("GET", GETALLPOST_API, {}, headers);

      console.log("this is new post design", responce)
      //validation
      if (!responce.data.success) {
        throw new Error(responce.data.message)
      }

      result = responce.data.data;
      console.log("this is from post api ", responce.data.data)
      result.forEach((e) => {
        // console.log("app post are these",e)
        dispatch(setPostdata(e))
      })

      // return result;

    }
    catch (error) {
      toast.success("something is issue while fetching the post")
      console.log("get error in fetching the post ", error)

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

      // console.log("from create post api", formData.desc, formData.file);
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

      let dataweb = { "name": "roshan", "town": "sit" }
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

//LIKE THE POST

export async function likePost(post_id, token) {
  try {
    const headers = { 'Authorization': `Bearer ${token}` };
    // console.log(post_id,token)
    const responce = await apiConnector("post", LIKEAPOST_API, { post_id }, headers);
    // console.log("this is the responce",responce)
    if (responce) {
      toast.success(responce?.data.message)
    }

  }
  catch (err) {
    console.log("something is issue while liking the post", err)
  }
}


//comment on post

export async function postComment(token, post_id, data) {



    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const responce = await apiConnector("post", COMMENTONAPOST_API, { comments: data, post_id }, headers)
      console.log("comment responce ", responce)
      if (responce) {
        toast.success("you comment added")
      }
      // arrOfC=responce.data

      // setComment(responce?.data.data)
      
      return responce?.data.data;
    }
    catch (err) {
      console.log("err while comment on post ", err)
    }
  }




//get all comment of post

export async function getAllComment(token, post_id) {
  

    let commentArray = [];
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const responce = await apiConnector("post", GETALLCOMMENT_API, { postId: post_id }, headers);
      console.log("this is comment list of post ", responce.data.data);
      if (responce) {
        toast.success("all comment fetched")
      }
      commentArray = responce.data.data;

      // commentArray.forEach((e) => {
      //   dispatch(setComment(e))
      // })
      return responce.data.data;


    }
    catch (err) {
      console.log("err while fetching the comments ", err)
    }
  }




