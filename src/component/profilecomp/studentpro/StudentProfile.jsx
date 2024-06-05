import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {ColorRing } from 'react-loader-spinner'
import { useEffect } from 'react';
import { getUserDetails } from '../../../service/operations/profileApi';
import { Button } from '../../../components/ui/button';
const StudentProfile = () => {
  const user = useSelector((state) => state.profile.user)
  const loading = useSelector((state) => state.auth.loading)
  const token=useSelector((state)=>state.auth.token)
  
  const dispatch=useDispatch();
  console.log("form profiel page", user)

  useEffect(()=>{
    
      dispatch(getUserDetails(token))
 
  },[])


  return (
    <div>
    {
      loading ? (<ColorRing 
                className=" mx-auto border-white p-4"
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  />)
      :(<div className='text-black  gap-y-4 text-lg '>
        <div className=' flex justify-between font-bold  shadow-lg items-center p-2  ' >
          <p>Basics Details</p>
          <NavLink
            to={"/profile/updateprofile"}
          >
            <Button  >update</Button></NavLink>
        </div>
        {/* profile photo */}
        <div className='flex gap-2 text-black items-center m-4' >
          <img src={user?.image} alt='user_image' className='h-[50px] w-[50px] object-cover rounded-full place-content-center' />

          <p>{user?.firstName}</p>
        </div>
        <div className='flex justify-around gap-4 border shadow-lg rounded-md p-4  ' >
          <div>
            <p>Mobile number</p>
            <p>Email</p>
            <p>University Name</p>
            <p>Collage Name</p>
          </div>
          <div>

            <p>+91{user?.profile?.number} </p>
            <p>{user?.email}</p>
            <p>{user?.collageinfo?.universityName}</p>
            <p>{user?.collageinfo?.collageName}</p>

          </div>

        </div>

      </div>)
    }
      
    </div>
  )
}

export default StudentProfile;
