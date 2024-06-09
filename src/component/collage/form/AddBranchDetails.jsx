import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaInfoCircle, FaFileUpload } from 'react-icons/fa';
import { addBranchDetails } from '../../../service/operations/collageStudentApi';
import { useSelector } from 'react-redux';
const AddBranchDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token)
  const onSubmit = async(data) => {
    
    let formData = new FormData()
    formData.append('file', data.file[0]);
    formData.append('branchName',data.branchName);
    formData.append('collageName',data.collageName)
    formData.append("about",data.about);
    const res=await addBranchDetails(token,formData,navigate);
    console.log("creating the collage profile is",res)
  };

  return (
    <div className=" flex items-center justify-center min-w-full  p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 space-y-6 w-full ">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Create Collage Profile</h1>
        
        <div className="flex flex-col w-full">
          <label className="mb-2 text-gray-700 flex items-center">
            <FaUniversity className="mr-2" />
            Collage Name
          </label>
          <input
            {...register("collageName", { required: "Collage Name is required", maxLength: { value: 20, message: "Max length is 20" } })}
            className={`border ${errors.collageName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
            placeholder="Enter your collage name"
          />
          {errors.collageName && <span className="text-red-500 text-sm mt-1">{errors.collageName.message}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-2 text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2" />
            About
          </label>
          <input
            {...register("about",  )}
            className={`border ${errors.about ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
            placeholder="Tell us about yourself"
          />
          {errors.about && <span className="text-red-500 text-sm mt-1">{errors.about.message}</span>}
        </div>

        <div className="flex flex-col w-full">
          <label className="mb-2 text-gray-700 flex items-center">
            <FaFileUpload className="mr-2" />
            Upload File
          </label>
          <input
            type="file"
            {...register('file', { required: "File is required" })}
            className={`border ${errors.file ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
          />
          {errors.file && <span className="text-red-500 text-sm mt-1">{errors.file.message}</span>}
        </div>

        <button type='submit' className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBranchDetails;
