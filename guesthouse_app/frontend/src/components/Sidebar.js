import React, { useState,useEffect } from 'react';
import {FaBars}from "react-icons/fa";
import { NavLink,useNavigate } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { IoRestaurantSharp } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import logo from "../assets/logo.png"
import supabase from "../config/supabaseClient";





const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    const menuItem=[
        {
            name: "Home",
            path: "/home",
            icon: <AiIcons.AiFillHome />,
           
          },
          {
            name: "Room Check-In",
            path: "/room_check_in",
            icon: <FaIcons.FaBell/>,
         
          },
          {
            name: "Room Booking",
            path: "/room_booking",
            icon: <FaCalendarPlus />
         
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

   
  

  
    async function signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error during sign out:', error.message);
        } else {
          console.log('User successfully signed out');
          // Perform any additional actions after sign-out
          navigate('/');
        }
      } catch (error) {
        console.error('Error during sign out:', error.message);
      }
    }

    return (
        <div>
           <div style={{width: isOpen ? "250px" : "80px"}} className="sidebar">
             
               <div className="top_section">
                   <div style={{display: isOpen ? "block" : "none"}} className="logo"> <img src={logo} alt="logo" style={{height:"100px", marginLeft:"15px"}}></img></div>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>

               

               {user && (
                <button
                  className="btn"
                  style={{ color: 'white', backgroundColor: '#665651', marginTop: '20px', marginLeft: "65px" }}
                  onClick={signOut}
                >
                  Sign Out
                </button>
              )}

               
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