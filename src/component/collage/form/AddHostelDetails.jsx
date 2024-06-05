import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUniversity, FaHome, FaInfoCircle, FaFileUpload, FaPlusCircle } from 'react-icons/fa';
import { addHostelDetails } from '../../../service/operations/collageStudentApi';
import { useSelector } from 'react-redux';
const AddHostelDetails = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            forms: [{ collageName: '', hostelName: '', about: '', file: null }],
        },
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'forms' });
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)
    const onSubmit = async (data) => {
        console.log(data);
        const res = await addHostelDetails(token,data,navigate)
        console.log("this is from form components",res)

        // Handle the form submission, e.g., send data to the server
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4 min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 space-y-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Add Hostel Details</h1>

                {fields.map((item, index) => (
                    <div key={item.id} className="space-y-4">
                        <div className="flex flex-col w-full">
                            <label className="mb-2 text-gray-700 flex items-center">
                                <FaUniversity className="mr-2" />
                                Collage Name
                            </label>
                            <input
                                {...register(`forms.${index}.collageName`, { required: "Collage Name is required", maxLength: { value: 20, message: "Max length is 20" } })}
                                className={`border ${errors.forms?.[index]?.collageName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
                                placeholder="Enter your collage name"
                            />
                            {errors.forms?.[index]?.collageName && <span className="text-red-500 text-sm mt-1">{errors.forms[index].collageName.message}</span>}
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="mb-2 text-gray-700 flex items-center">
                                <FaHome className="mr-2" />
                                Hostel Name
                            </label>
                            <input
                                {...register(`forms.${index}.hostelName`, { pattern: { value: /^[A-Za-z]+$/i, message: "Only letters are allowed" } })}
                                className={`border ${errors.forms?.[index]?.hostelName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
                                placeholder="Enter your hostel name"
                            />
                            {errors.forms?.[index]?.hostelName && <span className="text-red-500 text-sm mt-1">{errors.forms[index].hostelName.message}</span>}
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="mb-2 text-gray-700 flex items-center">
                                <FaInfoCircle className="mr-2" />
                                About
                            </label>
                            <input
                                {...register(`forms.${index}.about`, { required: "About is required", maxLength: { value: 20, message: "Max length is 20" } })}
                                className={`border ${errors.forms?.[index]?.about ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
                                placeholder="Tell us about the hostel"
                            />
                            {errors.forms?.[index]?.about && <span className="text-red-500 text-sm mt-1">{errors.forms[index].about.message}</span>}
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="mb-2 text-gray-700 flex items-center">
                                <FaFileUpload className="mr-2" />
                                Upload File
                            </label>
                            <input
                                type="file"
                                {...register(`forms.${index}.file`, { required: "File is required" })}
                                className={`border ${errors.forms?.[index]?.file ? 'border-red-500' : 'border-gray-300'} p-3 rounded-lg w-full`}
                            />
                            {errors.forms?.[index]?.file && <span className="text-red-500 text-sm mt-1">{errors.forms[index].file.message}</span>}
                        </div>

                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 hover:text-red-600 transition duration-200"
                            >
                                Remove Form
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => append({ collageName: '', hostelName: '', about: '', file: null })}
                    className="flex items-center text-blue-500 hover:text-blue-600 transition duration-200"
                >
                    <FaPlusCircle className="mr-2" />
                    Add Form
                </button>

                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddHostelDetails;
