import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner'
import { useEffect,useState } from 'react';
import { getUserDetails } from '../../../service/operations/profileApi';
import { Button } from '../../../components/ui/button';
import { CiEdit } from "react-icons/ci";
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "../../../components/ui/popover";
import { Input } from "../../../components/ui/input";
import { updatePhoto } from '../../../service/operations/authApi';
const StudentProfile = () => {
  const user = useSelector((state) => state.profile.user)
  const loading = useSelector((state) => state.auth.loading)
  const token = useSelector((state) => state.auth.token)
  const [selectedFile, setSelectedFile] = useState(null);
  const[userPhoto,setPhoto]=useState(null);
  const dispatch=useDispatch();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    const response= dispatch(updatePhoto(formData,token));
    console.log("File uploaded successfully:", response);
    setPhoto(response.url)
    // Update user image state here if needed
    
  };
  // console.log("form profile page", user)

  useEffect(() => {

    dispatch(getUserDetails(token))

  }, [])


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
          : (<div className='text-black  gap-y-4 text-lg '>
            <div className=' flex justify-between font-bold  shadow-lg items-center p-2  ' >
              <p>Basics Details</p>
              <NavLink
                to={"/profile/updateprofile"}
              >
                <Button  >update</Button></NavLink>
            </div>
            {/* profile photo */}
            <div className='flex gap-2 text-black items-center m-4'>
              <div className='relative'>
                <img src={`${userPhoto? userPhoto:user?.image}`} alt='user_image' className='h-[50px] w-[50px] object-cover rounded-full' />
                <Popover>
                  <PopoverTrigger>
                    <CiEdit size={20} className='absolute top-1 right-0 bg-white rounded-full p-1 cursor-pointer' />
                  </PopoverTrigger>
                  <PopoverContent className="flex gap-x-2 p-2">
                    <Input type="file" onChange={handleFileChange} />
                    <Button onClick={handleUpload}>Upload</Button>
                  </PopoverContent>
                </Popover>
              </div>
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
