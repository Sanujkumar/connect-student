import React, { useEffect, useState } from 'react';
import { AiFillGithub, AiOutlineLinkedin } from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../service/operations/profileApi';
import { CiEdit } from 'react-icons/ci';
import { ColorRing } from 'react-loader-spinner';
import { Popover, PopoverTrigger, PopoverContent } from '../../components/ui/popover';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { updateBanner } from '../../service/operations/authApi';
import LoadingIcon from "../../common/loading/loadingIcon"
const ShortDesc = () => {
  const user = useSelector((state) => state.profile.user);
  const token = useSelector((state) => state.auth.token);
  const [load, setLoad] = useState(false);
  const [bannerPhoto, setBannerPhoto] = useState("https://via.placeholder.com/1500x500");
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (user?.banner) {
      setBannerPhoto(user.banner);
    }
  }, [user]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }
    setLoad(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await updateBanner(formData, token);
      console.log("File uploaded successfully:", response);
      setBannerPhoto(response.bannerUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className='flex justify-center items-center text-sm border w-full shadow-sm rounded-xl mx-auto'>
      {loading ? (<LoadingIcon/>) : (
        <div className='w-full'>
          <div className='flex-row justify-center mx-auto w-full text-center font-semibold items-center'>
            <div className='relative'>
              <img src={bannerPhoto} alt='Banner' className='relative h-20 w-full object-cover rounded-t-xl' />
              
              <Popover>
                <PopoverTrigger>
                  <CiEdit size={20} className='absolute top-1 right-0 bg-white rounded-full p-1 cursor-pointer' />
                </PopoverTrigger>
                
                <PopoverContent className="flex gap-x-2 p-2">
                  <Input type="file" onChange={handleFileChange} />
                  <Button onClick={handleUpload}>{load ? 'Loading...' : 'Upload'}</Button>
                </PopoverContent>
              
              </Popover>
            
            </div>
            <div className='grid gap-4 absolute top-12 place-items-center justify-center mx-auto left-0 right-0 pb-2'>
              <img src={user?.image} className='h-[70px] w-[70px] rounded-full object-cover object-center z-40' alt="Profile" />
              <div>
                <p className='text-sm font-thin'>{user?.profile?.about}</p>
                <p className='text-lg font-semibold hover:border-b-2 border-green-900'>{user?.firstName}</p>
              </div>
            </div>
          </div>
          <div className='flex-row gap-y-2 justify-center text-center min-h-[6.4rem] mt-2' />
          <div className='flex flex-col justify-around border-y p-4 text-[1rem] font-thin border-l-[0.2rem] border-l-teal-900'>
            <p>College Name <span className='font-semibold mx-2'>{user?.collegeInfo?.collegeName}</span></p>
            <p>Total posts <span className='font-semibold mx-4'>{user?.postDetail?.length}</span></p>
          </div>
          <div className='flex justify-around border-b p-3'>
            <a href={user?.profile?.linkedin} target='_blank' rel="noreferrer">
              <AiOutlineLinkedin size={30} className='text-green-900 hover:scale-110' />
            </a>
            <a href={user?.profile?.github} target='_blank' rel="noreferrer">
              <AiFillGithub size={30} className='hover:scale-110' />
            </a>
          </div>
          <div className='flex items-center gap-x-4 mx-auto p-4'>
            <BsBookmark />
            <p>My items</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortDesc;
