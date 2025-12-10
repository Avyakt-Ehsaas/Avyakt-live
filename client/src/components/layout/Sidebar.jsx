import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Clock,
  Settings,
  BarChart3,
  Video,
  Zap,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { name: 'Home', icon: FaHome, path: '/' },
  { name: 'Dashboard Core', icon: LayoutDashboard, path: '/admin' },
  { name: 'User Management', icon: Users, path: '/admin/users' },
  {name : 'Create Meeting' , icon: Video, path : '/admin/create-meeting'}
  { name: 'Analytics Hub', icon: BarChart3, path: '/admin/analytics' },
  { name: 'Session Control', icon: Clock, path: '/admin/security-logs' },
  { name: 'System Settings', icon: Settings, path: '/admin/settings' }
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // ✅ Auto hide sidebar when user logs out
  if (!user) return null;

  // ✅ Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const baseLinkClass =
    'flex items-center p-3 rounded-lg text-gray-400 transition duration-300 transform hover:bg-cyan-900/40 hover:text-cyan-400 border border-transparent';

  const activeLinkClass =
    'bg-purple-800/60 text-cyan-300 border-cyan-500/80 shadow-lg shadow-purple-500/30';

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* ✅ MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-[999] bg-gray-900/80 backdrop-blur text-cyan-400 p-2 rounded-lg shadow-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* ✅ SIDEBAR */}
      <AnimatePresence>
        {(open || window.innerWidth >= 768) && (
          <motion.div
            ref={sidebarRef}
            className="fixed top-0 left-0 h-screen w-64 bg-gray-950/95 backdrop-blur-md shadow-2xl shadow-black/80 p-6 z-50"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          >
            {/* LOGO */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center mb-10 p-2 pb-5 border-b border-gray-700/50"
            >
              <Zap className="w-7 h-7 text-cyan-400 mr-3 animate-pulse" />
              <h1 className="text-2xl font-extrabold text-white tracking-wider">
                ADMIN <span className="text-purple-400">Avaykt</span>
              </h1>
            </Link>

            {/* NAV */}
            <nav className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, x: 6 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`${baseLinkClass} ${
                        isActive ? activeLinkClass : ''
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 mr-3 ${
                          isActive ? 'text-cyan-300' : 'text-purple-500'
                        }`}
                      />
                      <span className="font-medium text-sm">
                        {item.name}
                      </span>
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>

            {/* LOGOUT */}
            <motion.div
              className="absolute bottom-6 left-6 right-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-800/70 text-red-400 transition duration-300 hover:bg-red-900/50 hover:text-white border border-red-500/30"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span className="font-semibold text-sm">Logout Session</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
