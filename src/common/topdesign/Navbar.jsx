import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillFilePersonFill } from "react-icons/bs"
import { BsFillHSquareFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsUnion } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiDotsNineThin } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";



const Navbar = () => {
  return (
    <div className='flex-col justify-center  relative  z-30  ' >
      <nav className='flex justify-around shadow-md  fixed w-full top-0 bg-neutral-100 mx-auto place-items-center p-1'>
        <ul className='flex justify-center items-center text-sm gap-5  p-2' >
          <li >
            <NavLink to="/"  > <BsUnion size={22} className='mx-auto fill-black' /></NavLink>
          </li>
          <li>
            <input className={`border p-1 mx-auto rounded-md bg-neutral-200 `} placeholder='search' type='search' />
          </li>
        </ul>
        <ul className='flex justify-center  items-center  gap-x-14   text-xs ' >
          <li>
            <NavLink to="/" activeClassName="text-blue-500 font-bold" > <BsFillHSquareFill size={18} className='mx-auto  ' /> <span>Home</span></NavLink>
          </li>
          <li>

            <NavLink to='/collage'>
              <BsFillPeopleFill size={18} className='mx-auto ' />
              <span>Collage</span>
            </NavLink>
          </li>
          <li>
            <NavLink><IoIosNotificationsOutline size={22} className='mx-auto' /><span>Notifications</span></NavLink>
          </li>
          <li><NavLink to="profile" > <BsFillFilePersonFill size={16} className='mx-auto ' /><span>Me</span></NavLink></li>
        </ul>
        <ul className={`flex-col text-xs gap-y-2 cursor-pointer`}>

          <PiDotsNineBold size={20} />
          <span>Business</span>
        </ul>
      </nav>

    </div>
  )
}
export default Navbar;
