import React, { useState, useRef , useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Logo from '../../../assets/images/Logo.svg'
import LogoDark from '../../../assets/images/LogoDark.svg'
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LandingSidebar = ({ isDarkBg }) => {

const [profileOpen, setProfileOpen] = useState(false);
const profileRef = useRef(null);

// spring logic 
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = JSON.parse(
          atob(token.split(".")[1])
        );

        setPayload(decoded);

        console.log("User Payload:", decoded);
      } catch (error) {
        console.log("Invalid token");
      }
    }
  }, []);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  console.log("User Payload in LandingSidebar:", payload);


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  //  Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Don't hide when mobile menu is open
    if (mobileMenuOpen) return;

    setScrolled(latest > 80);

    if (latest > previous && latest > 80) {
      setHidden(true); 
      } else {
      setHidden(false); 
    }
  });

  const handleLogout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setPayload({});
    setProfileOpen(false);
    toast.success("User logged out");
    navigate("/");
  } catch (error) {
    toast.error("Logout failed");
  }
};

  const menu = [
    { label: "Home", path: "/" },
    // { label: "The Science", path: "/science" },
    {label : "Live Sessions" , path : "/live-sessions"},
    { label: "Library", path: "/library" },
    { label: "About", path: "/about" },
    // { label: "Blogs", path: "/blogs" },
    { label : "Contact", path: "/contact" },
    // ...(user?.role === "admin"
    //   ? [{ label: "Admin Panel", path: "/admin/dashboard" }]
    //   : []),
  ];

  const handleJoinUsClick = () => {
      try {
        navigate("/auth/login");
        toast.success("Welcome back!");
      } catch (error) {
        toast.error("Error while login")
      }
    }


  return (
    <div className="flex justify-around">

      {/* 
       Motion Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-180%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50  flex justify-center
        ${mobileMenuOpen ? "px-0 mt-0" : "px-4 mt-6"}
        transition-all duration-300
        `}
      >
      <div className={`w-full max-w-6xl rounded-full 
  bg-gradient-to-r from-white/10 via-white/5 to-white/10 
  backdrop-blur-xl backdrop-saturate-200 border border-white/20 
  shadow-[0_10px_40px_rgba(0,0,0,0.15)]
  ${mobileMenuOpen 
    ? "min-h-screen rounded-none backdrop-blur-2xl pt-8" 
    : ""
  }
`}>

          {/* Top Bar */}
          <div className="px-4 md:px-6 py-2 flex items-center justify-between">

            {/* Logo */}
            <img
              src={isDarkBg ? Logo : LogoDark}
              alt="logo"
              className="w-[40px] h-[40px]"
            />

            {/* Desktop Menu */}
            <div className="hidden md:flex md:gap-12 text-medium font-medium">
              {menu.map((item, i) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={i}
                    to={item.path}
                    className={`
                      transition-colors font-dm text-base duration-300 underline-offset-8
                      ${isActive
                        ? "text-[#71AC61] underline decoration-[#71AC61]"
                        : isDarkBg
                          ? "text-white hover:text-[#71AC61] hover:underline"
                          : "text-[#191919] hover:text-[#71AC61] hover:underline"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Button */}
          <div className="hidden md:flex items-center">
  {payload?.sub ? (
    <div ref={profileRef} className="relative">
      <button
        onClick={() => setProfileOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#71AC61] text-white hover:bg-[#4F7944] transition-all duration-300 shadow-sm"
      >
        <User size={21} />
      </button>

      {profileOpen && (
        <div className="absolute right-0 top-[58px] w-[285px] overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] z-[999]">
          <div className="px-5 py-2 border-b border-gray-100">
            <p className="mt-1 font-dm paragraph-secondary text-gray-500 text-left">Logged in as</p>
            <h3 className="font-dm paragraph-body font-med text-primary break-all text-left">
              {payload?.sub}
            </h3>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-4 font-dm paragraph-secondary font-semibold text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      onClick={handleJoinUsClick}
      className="px-4 py-3 bg-[#71AC61] text-white rounded-full hover:bg-[#4F7944] transition font-dm text-lg"
    >
      Join us
    </button>
  )}
</div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} className={isDarkBg ? "text-white" : "text-black"} />
              ) : (
                <Menu size={24} className={isDarkBg ? "text-white" : "text-black"} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 px-4 py-4 space-y-3">
              {menu.map((item, i) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={i}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      block py-2 px-3 rounded-lg transition
                      ${isActive
                        ? "text-[#71AC61] bg-white/10"
                        : isDarkBg
                          ? "text-white hover:text-[#71AC61] hover:bg-white/10"
                          : "text-black hover:text-[#71AC61] hover:bg-white/10"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {payload?.sub ? (<>
                <div className="mt-4 mb-2 px-3 py-2 rounded-lg bg-slate-100/30 text-primary">
                <h3 className='text-left font-dm paragraph-body px-4 text-primary'>{payload?.sub}</h3>
                </div>
              <button
              onClick={handleLogout}
              className="w-full mt-3 px-4 py-3 bg-[#71AC61] hover:bg-[#4F7944] text-white rounded-full transition-all duration-300 ">
                Logout
              </button>
              </>) : (<>
              <button 
              onClick={handleJoinUsClick}
              className="w-full mt-3 px-4 py-3 bg-[#71AC61] hover:bg-[#4F7944] text-white rounded-full transition-all duration-300">
                Join us
              </button>
              </>)}
              
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default LandingSidebar;