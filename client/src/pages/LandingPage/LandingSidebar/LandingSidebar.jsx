import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
// import logo from '../../../assets/Logo.svg'
import { useAuth } from '../../../hooks/useAuth'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { toast } from 'react-hot-toast'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from '../../../assets/images/Logo.svg'
import LogoDark from '../../../assets/images/LogoDark.svg'
import { Menu, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger);

const LandingSidebar = ({ isDarkBg }) => {

  const { user, logout, fetchMe } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [isHeroSection, setIsHeroSection] = useState(true)
  const location = useLocation();

  useGSAP(() => {
    gsap.from(sidebarRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
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
    { label: "Home", path: "/" },
    { label: "The Science", path: "/science" },
    { label: "Programs", path: "/programs" },
    //  {  label: "Live-session", path: "/dashboard" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blogs", path: "/blogs" },
    { label: "Spritual", path: "/spiritual-edu/genai" },
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
      <div className='flex justify-around'>
        <nav
          className={`fixed top-0 left-0 right-0 md:mt-4 z-50 w-screen 
              md:px-0
              font-dm
              flex justify-center
              ${mobileMenuOpen ? "px-0 mt-0" : "px-4 mt-6"}
          `}>
          <div className={`w-full max-w-6xl rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur backdrop-saturate-200 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.15)]
            ${mobileMenuOpen ? "min-h-screen rounded-none backdrop-saturate-400 backdrop-blur-2xl bg-gradient-to-r from-black/5 via-black/2 to-black/5 pt-8" : ""}
            `}>
            <div className={`px-4 md:px-6 py-2 flex items-center justify-between`}>

              {/* Logo */}
              <h1 className="text-xl font-semibold tracking-wide">
                <img src={isDarkBg ? Logo : LogoDark} alt="Avyakt-ehsaas-logo" className={`w-[40px] h-[40px] ${isDarkBg ? "text-greenbase" : "text-white"}`} />
              </h1>

              {/* Desktop Menu */}
              <div className='hidden md:flex md:gap-12 text-medium font-medium'>
                {menu.map((item, i) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={i}
                      to={item.path}
                      className={`
                        transition-colors duration-300
                        underline-offset-8
                        ${isActive 
                          ? "text-[#71AC61] underline decoration-[#71AC61]" 
                          : isDarkBg
                            ? "text-white hover:text-[#71AC61] hover:underline decoration-[#71AC61]"
                            : "text-[#191919] hover:text-[#71AC61] hover:underline decoration-[#71AC61]"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop Join Button */}
              <button
                className='hidden md:block px-4 py-3 bg-[#71AC61] text-white rounded-[50px] hover:scale-105 transition-transform duration-300'
              >
                Join us
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                className='md:hidden flex items-center'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X size={24} className={isDarkBg ? "text-white" : "text-[#191919]"} />
                ) : (
                  <Menu size={24} className={isDarkBg ? "text-white" : "text-[#191919]"} />
                )}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className='md:hidden border-t border-white/20 px-4 py-4 space-y-3'>
                {menu.map((item, i) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={i}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        block py-2 px-3 rounded-lg transition-colors duration-300
                        ${isActive 
                          ? "text-[#71AC61] bg-white/10" 
                          : isDarkBg
                            ? "text-white hover:text-[#71AC61] hover:bg-white/10"
                            : "text-[#191919] hover:text-[#71AC61] hover:bg-white/10"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  className='w-full mt-3 px-4 py-3 bg-[#71AC61] text-white rounded-[50px] hover:scale-105 transition-transform duration-300'
                  
                >
                  Join us
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}

export default LandingSidebar