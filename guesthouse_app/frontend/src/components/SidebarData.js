import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { IoRestaurantSharp } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import companyLogo from "../assets/logo.png";

export const SidebarData = [
  {
    title: "PARK AVENUE 2443",
    icon: <img src={companyLogo} alt="Company Logo" className="company-logo" />,
    cName: "company-text", 
  },
  
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Room Booking",
    path: "/room_booking",
    icon: <FaIcons.FaBell/>,
    cName: "nav-text",
  },
  {
    title: "Restaurant",
    path: "/restaurant",
    icon: <IoRestaurantSharp />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <BiSolidReport />,
    cName: "nav-text",
  },
  {
    title: "Management",
    path: "/management",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];
