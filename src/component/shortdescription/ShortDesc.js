import React, { useEffect, useState } from 'react'
import mountain from '../../asects/image/mountain.jpg';
import {AiFillGithub} from 'react-icons/ai';
import {AiOutlineLinkedin} from 'react-icons/ai';
import { BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../service/operations/profileApi';
const ShortDesc = () => {

  const user = useSelector((state) => state.profile.user)
  const token=useSelector((state)=>state.auth.token)
  const [data,setdata]=useState();
  const dispatch=useDispatch();
  
  
  useEffect(() => {
    dispatch(getUserDetails(token))
  
    },[]);

    // console.log("this is me",user)

  return (
    <div className='flex-row justify-center  text-sm  border w-full  shadow-sm rounded-xl mx-auto  '>
      <div className='flex-row justify-center mx-auto w-full text-center font-semibold items-center' >
        <img src={mountain} alt='..' sizes={10} className=' relative h-20 w-full object-cover rounded-t-xl ' />
        <div className=' grid gap-4 absolute top-12 place-items-center justify-center mx-auto left-0 right-0  pb-2'>
          <img src={user?.image} className=' h-[70px] w-[70px] rounded-full object-cover object-center z-40'
          alt="hello" />
          <div>
          <p className='text-sm font-thin ' >{user?.profile?.about} </p>          
          <p className='text-lg font-semibold hover:border-b-2 border-green-900' >{user?.firstName} </p>
          </div>
        </div>

      </div> 
      <div className='flex-row gap-y-2 justify-center text-center min-h-[6.4rem] mt-2  ' />
      <div className='flex flex-col justify-around border-y bottom-0 p-4 text-[1rem] font-thin  border-l-[0.2rem] border-l-teal-900' >
        <p >{`collage Name ${" "} `}<span className='  font-semibold mx-2'>{user?.collageinfo?.collageName}</span></p>
        <p>{`Total post${""} `} <span className='  font-semibold mx-4'>{user?.postdetail?.length}</span></p>
      </div>

        <div className='flex justify-around border-b p-3 bottom-0' >
         <a href={user?.profile?.linkedin} target='_blank'rel="noreferrer" > <AiOutlineLinkedin size={30} className='flex text-green-900 hover:scale-110' /></a>
         <a href={`${user?.profile?.github}`} target='_blank' rel="noreferrer"> <AiFillGithub size={30} className='hover:scale-110' /></a>
        </div>
        <div className='flex items-center gap-x-4 mx-auto  p-4'>
          <BsBookmark/>
          <p>My items</p>
        </div>
    </div>
  )
}

export default ShortDesc;
