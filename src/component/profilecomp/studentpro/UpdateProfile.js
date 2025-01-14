import React from 'react'
import { useForm } from 'react-hook-form';
import {updateProfileDetails} from "../../../service/operations/profileApi"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
const formdata=[
    {name:"firstName",id:"firstname",type:"text",label:"Name"},
    {name:"number",id:"number",type:"text",label:"M.No"},
    {name:"gender",id:"gender",type:"text",label:"Gender"},
    {name:"github",id:"github",type:"text",label:"Github"},
    {name:"linkedin",id:"linkedin",type:"text",label:"Linkedin"},
    {name:"dob",id:"dob",type:"date",label:"DOB"},
    {name:"about",id:"about",type:"text",label:"About"},
    
]
const UpdateProfile = () => {
    const token=useSelector((state)=>state.auth.token)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register, handleSubmit,} = useForm();
      const styledata="flex text-xl text-start p-3 my-3 rounded-md";
      const onsummit=(data)=>{
        dispatch(updateProfileDetails(data,token,navigate))
        
        // console.log(data)
      }
      
    
  return (
    <div className=' flex shadow-md m-2 p-6  items-center justify-center  mx-auto  '>
    <form onSubmit={handleSubmit(onsummit)} className=' flex flex-col items-center justify-center' >
        <div className='grid grid-cols-2 gap-x-8 mb-12 '>
        {
          formdata.map((item,index)=>(
            <div key={index} >
                <label htmlFor={item.id} className=' font-semibold'> {item.label}</label>
                <Input id={item.id} className={`${styledata}`}  type={item.type}  {...register(`${item.name}`)} />
            </div> ))
        }
        </div>
        <Button type='submmit' className=' w-[12rem] '>Update</Button>
    </form>
    </div>
  )
}

export default UpdateProfile;
