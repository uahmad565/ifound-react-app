import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/user-dashboard",
    icon: <AiIcons.AiOutlineDashboard />,
    cName: "nav-text",
  },
  // {
  //   title: "My Lost Cases",
  //   path: "/lostMatchCases",
  //   icon: <IoIcons.IoMdPeople />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "My Found Cases",
  //   path: "/foundMatchCases",
  //   icon: <FaIcons.FaEnvelopeOpenText />,
  //   cName: "nav-text",
  // },
  ,
];
