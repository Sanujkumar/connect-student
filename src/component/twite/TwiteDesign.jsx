import React, { useState } from 'react'
import { createPost } from '../../service/operations/PostApi'
import { MdCancel } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { setClose } from '../../dataHouse/slice/authSlice'
import {ColorRing } from 'react-loader-spinner'
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
const TwiteDesign = () => {
  const token = useSelector((state) => state.auth.token)
  const loading=useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile);
  const habdleClosed = () => { dispatch(setClose(false))}
  const [postData, setpostData] = useState({ desc: "" })
  const [file, setfile] = useState({ data: "" })
  const { desc } = postData
  const { data } = file
  const handleOnchange1 = (e) => {
    setpostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }
    ))
  }
  const handleOnchange2 = (e) => {
    e.preventDefault()
    setfile(e.target.files[0])
  }

  //handle form submission
  const handlerOnSummit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', file)
    formData.append('desc', postData.desc)
    // console.log("post data are here", formData.file)
    if (!desc) {
      toast.error(" description are required")
    }
    dispatch(createPost(formData, navigate, token))
    console.log("function calling success")
    setpostData({
      desc: "",
    })
    setfile({ data: null })
  }



  return (
    <div className={`${loading? "flex bg-opacity-70":"bg-opacity-10"} mt-0 fixed inset-0 z-[1000]  justify-center  items-center overflow-auto  backdrop-brightness-50 `}> 
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
                  />): 
      (<div className="w-5/12 mx-auto mt-20 rounded-t-xl border border-richblack-400 bg-richblack-800 p-2 bg-white ">
        <div className='flex justify-between gap-x-4 border-b p-1 items-center'>
          <div className='flex items-center gap-x-4' >
            {/* <img src={user?.image} className='h-[50px] w-[50px] rounded-full object-cover ' /> */}
            <p>Roshan</p>
          </div>
          <div  >
            <MdCancel className='text-2xl text-gray-300 hover:text-gray-600' onClick={habdleClosed} />
          </div>

        </div>
        <form onSubmit={handlerOnSummit} >
          <div >
            <Textarea
              cols={20}
              rows={5}
              name="desc"
              value={desc}
              onChange={handleOnchange1}
              placeholder='share your thought'
              
            // {...register}
            />

          </div>
          {/* file upload section */}

          <div>
            <input
              type='file'
              accept="image/png, image/jpeg"
              name='file'
              multiple
              value={data}
              onChange={handleOnchange2}
              
              className=' border-none p-2 rounded-md outline-none'
            />

          </div>
          <div className=' flex justify-end'>
          <Button type='submit' className="w-24">Post</Button>
          </div>
          

        </form>
      </div>
      )}
    </div>
  )
}

export default TwiteDesign;
