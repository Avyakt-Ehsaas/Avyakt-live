import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../../../assets/images/LogoDark.svg";

import {
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import toast from "react-hot-toast";
import Loader from "../../ui/Loader";
import { motion, AnimatePresence } from "framer-motion";

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // Menu
  const loggedInMenu = [
    { label: "My Profile", path: "/user/profile" },
    { label: "Joined Meeting", path: "/join-meeting" },
    { label: "Meditation Videos", path: "/meditation-videos" },
    { label: "Emotion Analytics", path: "/user/emotion-analytics" },
    { label: "Surveys", path: "/surveys" },
  ];

  const loggedOutMenu = [
    { label: "Dashboard", path: "/dashboard" },
  ];

  const menu = user?.name ? loggedInMenu : loggedOutMenu;

  // Logout
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logout();
      toast.success("User logged out");
      setOpenMenu(false);
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {/* ================= NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl 
        bg-white/70 border-b border-green-100 shadow-sm">

        {/* Green Glow Background */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-200/40 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-300/40 rounded-full blur-3xl opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} className="w-10 h-10 rounded-xl" />
            <h1 className="ml-3 font-bold text-lg bg-gradient-to-r from-[#71AC61] to-[#81C784] bg-clip-text text-transparent">
              Avyakt-Ehsaas
            </h1>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-6">

            {menu.map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(item.path)}
                className="text-greenbase font-medium hover:text-green-500 transition"
              >
                {item.label}
              </motion.button>
            ))}

            {/* Profile */}
            {user?.name ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 bg-white/50 px-3 py-2 rounded-xl border border-green-100 hover:bg-white transition"
                >
                  <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-green-700">
                      {user?.name}
                    </p>
                    <p className="text-xs text-green-500">
                      {user?.email}
                    </p>
                  </div>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-44 bg-white border border-green-100 rounded-xl shadow-md p-2"
                    >
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-red-500 hover:bg-green-50 rounded-lg flex items-center gap-2"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth/login">
                <button className="px-4 py-2 rounded-full bg-greenbasebg text-white font-medium hover:bg-green-600 transition">
                  Join Us
                </button>
              </Link>
            )}

          </div>

          {/* ================= MOBILE ICON ================= */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-green-700"
          >
            {openMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden fixed top-[65px] left-0 w-full bg-white border-b border-green-100 shadow-md z-40"
          >
            <div className="flex flex-col p-4 gap-3">

              {menu.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(item.path);
                    setOpenMenu(false);
                  }}
                  className="text-left p-3 text-green-700 hover:bg-green-50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}

              {user?.name && (
                <button
                  onClick={handleLogout}
                  className="text-left p-3 text-red-500 hover:bg-green-50 rounded-lg flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserNavbar;