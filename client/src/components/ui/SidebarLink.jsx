import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const SidebarLink = ({ label, path, onClick, isLogout = false }) => {
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <motion.div
    whileHover={{textDecoration : "underline" , color: "#71AC61"}}
    style={{textDecoration : "none" , color : "#71AC61"}}
      className="w-full"
    >
      <NavLink
        to={path}
        onClick={onClick}
        className={`
          block w-full px-4 py-2.5 transition-all duration-300
          ${isActive 
            ? 'text-white font-medium' 
            : 'text-white underline'
          }
          ${isLogout ? 'mt-auto text-red-500 hover:bg-red-50' : ''}
          relative group
        `}
      >
        <span className={`
          relative inline-block
          ${isActive ? 'text-lg' : 'text-base'}
        `}>
          {label}
          <span className={`
            absolute -bottom-1 left-0 w-full h-0.5 
            transition-all duration-300
            ${isActive ? '' : ''}
          `}></span>
        </span>
      </NavLink>
    </motion.div>
  )
}

export default SidebarLink
