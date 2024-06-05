import React, { useEffect, useState } from 'react';
import { getCollageProfileDetails } from "../../service/operations/collageStudentApi"
import { useSelector } from 'react-redux';
import { CgEditHighlight } from "react-icons/cg";
import LandingPage from './LandingPage';
const CollagePage = () => {
  const [data, setData] = useState([]);
  const [CollageFacalitiesData, setCollageFacalitiesData] = useState([])
  const [branchdata, setBranchData] = useState([])
  const token = useSelector((state) => state.auth.token)
  console.log("array", data)
  const collageProfile = async () => {
    try {
      const resp = await getCollageProfileDetails(token);
      console.log("collage profile data are", resp)
      setData(resp.collageData)
      setCollageFacalitiesData(resp.hostalData)
      setBranchData(resp.branchData)
    }
    catch (error) {
      console.log("collage profile function is not working")
    }
  }

  useEffect(() => {
    collageProfile();
  }, [])

  let content_length = data?.length + branchdata?.length + CollageFacalitiesData?.length;

  if (content_length === 0) {
    return <LandingPage />
  }

  return (
    <div className='w-10/12 mx-auto mb-12'>
      {/* sections 1 */}
      <section>

        <div className='  flex-row justify-center items-center text-center mb-8 text-lg text-black bg-white rounded-md ' >
          {
            data?.map((item, index) => (
              <div key={index} className=''>
                <div>
                  <img src={item?.imageUrl} alt='collage image' className=' static h-40 w-full object-cover mb-6 rounded-md  ' />
                  <CgEditHighlight className='absolute top-20 right-36 z-10 cursor-pointer hover:text-xl  ' />
                </div>

                <p className=' absolute font-bold left-0 right-0 z-10 top-24'>
                  {item.collageName && item.collageName.length > 100 ? `${item.collageName.substring(0, 60)}...` : item.collageName}
                </p>
                <p className='font-inter py-4 px-12' >
                  {item.about && item.about.length > 100 ? `${item.about.substring(0, 100)}...` : item.about}
                </p>
              </div>))
          }
        </div>
      </section>



      <div className=' grid grid-rows-2 gap-y-12'>
        {/* section-2 */}
        <section>

          <div className=' h-auto w-full gap-y-4'>
            <div className=' flex justify-between'>
              <span className=' text-black font-semibold text-xl' >Our Collage Facalities</span>
              <button className=' p-1 border border-solid  rounded-md  hover:bg-neutral-200 flex items-center gap-x-2 ' >
                <span>Edit</span>

                <CgEditHighlight /></button>
            </div>
            <ul className='  grid grid-col grid-cols-5 content-end'>

              {
                CollageFacalitiesData?.map((item, index) => (
                  <li key={index}
                    className='flex-row text-black  text-xl shadow-lg text-center  rounded-md place-items-center  mx-1 my-2 bg-white
               h-auto  '>
                    <span className='font-semibold text-yellow-800 mb-4 bg-neutral-100 w-full p-1 rounded-md  '>  {item.hostalName} </span>
                    <p className='text-sm   p-4  text-start font-medium min-h-[7rem]' >
                      {item.about && item.about.length > 100 ? `${item.about.substring(0, 100)}...` : item.about}
                    </p>

                    <img src={item.imageUrl} className='rounded-b-lg object-cover  mx-auto w-full h-[10rem]   p-0 ' ></img>
                  </li>
                ))
              }

            </ul>
          </div>
        </section>

        {/* sections-3 */}
        <section>

          <div className=' h-auto w-full'>
            <div className=' flex justify-between'>
              <span className=' text-black font-semibold text-xl' >Avable Branch</span>
              <button className=' p-1 border border-solid  rounded-md  hover:bg-neutral-200 flex items-center gap-x-2 ' >
                <span>Edit</span>

                <CgEditHighlight /></button>
            </div>
            <ul className='  grid grid-col grid-cols-5 content-end'>

              {
                branchdata?.map((item1, index) => (
                  <li key={index}
                    className='flex-row text-black  text-xl shadow-lg text-center  rounded-md place-items-center  mx-1 my-2 bg-white
               h-auto  '>
                    <span className='font-semibold text-yellow-800 mb-4 bg-neutral-100 w-full p-1 rounded-md  '>  {item1.branchName} </span>
                    <p className='text-sm   p-4  text-start font-medium min-h-[7rem]' >
                      {item1.about && item1.about.length > 100 ? `${item1.about.substring(0, 100)}...` : item1.about}
                    </p>

                    <img src={item1.imageUrl} className='rounded-b-lg object-cover  mx-auto w-full h-[10rem]   p-0 ' ></img>
                  </li>
                ))
              }

            </ul>
          </div>
        </section>
      </div>
    </div>

  )
}

export default CollagePage;
