import React, { useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import Logo from '../../../assets/images/Logo.svg'
import LogoDark from '../../../assets/images/LogoDark.svg'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LandingSidebar = ({ isDarkBg }) => {

  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  // 🔥 Scroll Logic
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
      await logout();
      toast.success("User logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menu = [
    { label: "Home", path: "/" },
    { label: "The Science", path: "/science" },
    { label: "Programs", path: "/programs" },
    { label: "About", path: "/about" },
    { label: "Blogs", path: "/blogs" },
    ...(user?.role === "admin"
      ? [{ label: "Admin Panel", path: "/admin/dashboard" }]
      : []),
  ];

  return (
    <div className="flex justify-around">

      {/* 🔥 Motion Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-180%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 w-screen flex justify-center
        ${mobileMenuOpen ? "px-0 mt-0" : "px-4 mt-6"}
        transition-all duration-300
        ${scrolled ? "backdrop-blur-xl shadow-lg" : ""}
        `}
      >
        <div className={`w-full max-w-6xl rounded-full 
          bg-gradient-to-r from-white/10 via-white/5 to-white/10 
          backdrop-blur backdrop-saturate-200 border border-white/20 
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
                      transition-colors duration-300 underline-offset-8
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
            <button className="hidden md:block px-4 py-3 bg-[#71AC61] text-white rounded-full hover:scale-105 transition">
              Join us
            </button>

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

              <button className="w-full mt-3 px-4 py-3 bg-[#71AC61] text-white rounded-full">
                Join us
              </button>
            </div>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default LandingSidebar;