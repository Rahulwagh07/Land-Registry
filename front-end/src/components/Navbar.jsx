import React, {useState} from 'react'
import { Link, NavLink, matchPath, useLocation } from "react-router-dom"

import emblem from '../images/emblem.svg'
import '../css/Navbar.css'

const Navbar = (props) => {

   
  const location = useLocation();

  const NavLinks = [
    {
      id: 1,
      name: "Register Land",
      path: "/admin/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/admin/explore",
    },
];

const NavLinks2 = [
    {
      id: 1,
      name: "Profile",
      path: "/userprofile/",
    },
    {
      id: 2,
      name: "Property",
      path: "/userprofile/property",
    },
    {
        id:3,
        name:"Requests",
        path:"/userprofile/requests"
    },
    {
        id:4,
        name:"Requested",
        path:"/userprofile/requested"
    },
    {
        id:5,
        name:"Explore",
        path:"/userprofile/explore"
    }
];
 
const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
}

  const RenderMenu = () =>{

      return(
        (props.isAdmin) ? 
          <div className='flex gap-x-6 text-richblack-25'>
            {
                NavLinks.map((link) => (
                    <li key={link.id}>
                    <Link to={link?.path}>
                        <p className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`} >
                        {link.name}
                      </p>
                    </Link>
                    </li>
                ))
            }
          </div>
          :
          <div className='flex gap-8 ml-5'>
             {
                NavLinks2.map((link) => (
                    <li key={link.id}>
                    <Link to={link?.path}>
                        <p className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`} >
                        {link.name}
                      </p>
                    </Link>
                    </li>
                ))
            }
          </div>
      )
    }

  return (
    <div className='border-b-2 border-richblack-25 mb-6'>
        <nav className="navbar flex justify-between items-baseline" >
            <div className='ml-20'>
            <NavLink to='/'>
                <img src={emblem} alt="emblem" className="emblem"/>
            </NavLink>
            <h3 className='text-richblack-50'>{props.isAdmin ? "Admin" : ""}</h3>
            </div>

            <div className="text-richblack-25 -mt-2">
                <ul className="flex ">
                    <RenderMenu/>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar