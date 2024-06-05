import React from 'react';
import { FaBook, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import hostal1 from "../../asects/image/hostal1.png"
import hostal2 from "../../asects/image/hostal2.png"
import hostal3 from "../../asects/image/hostal3.png"
import { useNavigate } from 'react-router';
const hosteldata=[
  {image:hostal1},
  {image:hostal2},
  {image:hostal3},
 
]
const LandingPage = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h1 className="text-5xl font-bold mb-6">Create your Academic Excellence</h1>
        <p className="text-xl max-w-xl mx-auto">Dedicated to nurturing future leaders through comprehensive education and extracurricular excellence.</p>
        <button onClick={()=>navigate("/collage/create_collage_profile")}
              className=' px-12 mt-12 border border-solid bg-neutral-100 text-black rounded-md hover:bg-neutral-300 py-1 ' >create</button>
      </section>

      {/* hostel section */}
      <section className="my-2 ">
        <div className=' flex gap-x-2 max-w-6xl mx-auto '>
          {hosteldata.map((item,index)=>(
            <div key={index} className=''>
            <img src={item.image} className=' rounded-xl' />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6 bg-blue-100 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Features</h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-full md:w-1/3 bg-white shadow-lg p-6">
              <FaBook className="text-5xl mx-auto text-blue-600" />
              <h3 className="text-2xl font-bold mt-4">Science & Technology</h3>
              <p className="mt-2">Explore the world of science with our cutting-edge technology courses.</p>
            </div>
            <div className="w-full md:w-1/3 bg-white shadow-lg p-6">
              <FaUserGraduate className="text-5xl mx-auto text-blue-600" />
              <h3 className="text-2xl font-bold mt-4">Arts & Humanities</h3>
              <p className="mt-2">Delve into the human experience with our comprehensive arts programs.</p>
            </div>
            <div className="w-full md:w-1/3 bg-white shadow-lg p-6">
              <FaChalkboardTeacher className="text-5xl mx-auto text-blue-600" />
              <h3 className="text-2xl font-bold mt-4">Professional Development</h3>
              <p className="mt-2">Advance your career with our professional development offerings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
