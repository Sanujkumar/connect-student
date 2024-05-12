import React, { useEffect, useState } from 'react'
import InfiteScroll from 'react-infinite-scroll-component';
import PostDesign from './PostDesign';

import {getAllPost} from "../../service/operations/PostApi"
import { useDispatch, useSelector } from 'react-redux';


const InfiniteData = () => {
    const[dataSource,setdata]=useState([]);
    const dispatch=useDispatch()
    const token=useSelector(state=>state.auth.token)
    const allpost=useSelector(state=>state.post.postList)
    console.log("our post is coming is here ",allpost)
    console.log("length of the array is ",allpost.length)
    

    useEffect(()=>{
      dispatch(getAllPost(token))
    },[])

  return (
    <div>
      <InfiteScroll 
      dataLength={dataSource.length}
      className='grid grid-cols-[36rem] justify-center scroll-smooth'>
      <PostDesign data={allpost}/>
        </InfiteScroll>
    </div>
  )
}

export default InfiniteData;
