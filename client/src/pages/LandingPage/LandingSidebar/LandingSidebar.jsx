import React , {useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
// import logo from '../../../assets/Logo.svg'
import { useAuth } from '../../../hooks/useAuth'
import SidebarLink from '../../../components/ui/SidebarLink'
import { FiMenu , FiX , FiSettings , FiPhoneCall , FiLogOut , FiUser, FiHome, FiSearch ,  FiBook , FiSunrise} from 'react-icons/fi'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { MdDashboard } from 'react-icons/md'
import {motion , AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {toast}  from 'react-hot-toast'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from '../../../assets/images/Logo.svg'

gsap.registerPlugin(ScrollTrigger);

const LandingSidebar = () => {
   
      const { user, logout, fetchMe } = useAuth();
      const [openMenu, setOpenMenu] = useState(false);
      const [profileOpen, setProfileOpen] = useState(false);
      const navRef = useRef(null);
      const navigate = useNavigate();

      useGSAP(() => {
        gsap.from(sidebarRef.current,{
          opacity:0,
          y:20,
          duration:1,
          delay: 0.2,
          ease:"power3.out",
        })

      })


      const sidebarRef = useRef(null);
      const handleLogout = async () => {
            try {
              await logout();
              toast.success("User logged out");
              setOpenMenu(false)
              setProfileOpen(false)
            } catch (error) {
              console.error("Logout error:", error);
              toast.error(`Logout failed: ${error.message || 'Please try again'}`);
            }
      };

    // const menu = [
    //      {  label: "Home", path: "/" },
    //      {  label: "Programs", path: "/programs" },
    //      {  label: "Research", path: "/research" },
    //      {  label: "Live-session", path: "/dashboard" },
    //      { label: "About", path: "/about" },
    //      { label: "Contact", path: "/contact" },

    //        ...(user?.role === "admin"
    //   ? [
    //       {
    //         label: "Admin Panel",
    //         path: "/admin/dashboard",
    //       },
    //     ]
    //   : []),
    // ]


     const menu = [
         {  label: "Home", path: "/" },
          {  label: "The Science", path: "/" },
         {  label: "Programs", path: "/programs" },
        //  {  label: "Live-session", path: "/dashboard" },
          { label: "About", path: "/about" },
         { label: "Contact", path: "/contact" },
          { label: "Blogs", path: "/" },

           ...(user?.role === "admin"
      ? [
          {
            label: "Admin Panel",
            path: "/admin/dashboard",
          },
        ]
      : []),
    ]


     return (
    <>
     <nav 
     className='fixed  mt-4 z-50  
     font-dm
     rounded-full
      bg-white/1
      backdrop-blur-sm
      backdrop-saturate-10
      border border-l-4 border-r-4 border-white/20
      shadow-[0_10px_40px_rgba(0,0,0,0.05)]
      '
    >
      <div className={`px-6 py-2 flex items-center justify-around ${user ? "gap-25" : "gap-25"} ${user && user.role==='admin' ? "gap-10" : "gap-30"} `}>

        <h1 className="text-xl font-semibold tracking-wide">
          <img src={Logo} alt="Avyakt-ehsaas-logo" className='w-[40xpx] h-[40px]'/>
        </h1>

        <div className='hidden md:flex md:gap-12 text-medium font-medium'>
        {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="text-white font-medium hover:text-[#71AC61] transition-colors duration-300 hover:underline underline-offset-8 decoration-[#71AC61]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
        className='px-4 py-3 bg-[#71AC61] text-white rounded-[50px] hover:bg-[#71AD69]'
        >
          Join us
        </button>
      </div>
    </nav>
    </>   
)
}

export default LandingSidebar