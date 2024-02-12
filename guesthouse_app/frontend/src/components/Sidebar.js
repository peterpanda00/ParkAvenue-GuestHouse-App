import React, { useState } from 'react';
import {FaBars}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import logo from "../assets/logo.png"


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            name: "Home",
            path: "/",
            icon: <AiIcons.AiFillHome />,
           
          },
          {
            name: "Room Booking",
            path: "/room_booking",
            icon: <FaIcons.FaBell/>,
         
          },
          {
            name: "Restaurant",
            path: "/restaurant",
            icon: <IoRestaurantSharp />,
            
          },
          {
            name: "Reports",
            path: "/reports",
            icon: <BiSolidReport />,
            
          },
          {
            name: "Management",
            path: "/management",
            icon: <IoIcons.IoMdPeople />,
         
          }
    ]
    return (
        <div>
           <div style={{width: isOpen ? "250px" : "80px"}} className="sidebar">
             
               <div className="top_section">
                   <div style={{display: isOpen ? "block" : "none"}} className="logo"> <img src={logo} alt="logo" style={{height:"100px", marginLeft:"15px"}}></img></div>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;