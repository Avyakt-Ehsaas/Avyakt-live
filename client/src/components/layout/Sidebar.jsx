import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Clock, Settings, BarChart3, Zap, LogOut } from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navItems = [
    {name : "Home" , icon: FaHome , path: "/"},
    { name: 'Dashboard Core', icon: LayoutDashboard, path: '/admin' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Analytics Hub', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Session Control', icon: Clock, path: '/admin/security-logs' },
    { name: 'System Settings', icon: Settings, path: '/admin/settings' },
];

const Sidebar = () => {
    const location = useLocation();

    const baseLinkClass = "flex items-center p-3 rounded-lg text-gray-400 transition duration-300 transform hover:bg-cyan-900/40 hover:text-cyan-400 border border-transparent";
    const activeLinkClass = "bg-purple-800/60 text-cyan-300 border-cyan-500/80 shadow-lg shadow-purple-500/30";
    const logoClass = "flex items-center mb-10 p-2 pb-5 border-b border-gray-700/50";

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.div 
            className="fixed top-0 left-0 h-screen w-60 bg-gray-950/90 backdrop-blur-md shadow-2xl shadow-black/80 p-6 z-50"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
            <Link 
            to="/"
            className={logoClass}>
                <Zap className="w-7 h-7 text-cyan-400 mr-3 animate-pulse" />
                <h1 className="text-2xl font-extrabold text-white tracking-wider">
                    ADMIN <span className="text-purple-400">Avaykt</span>
                </h1>
            </Link>

            <nav className="space-y-2">
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <motion.div
                            key={item.name}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.05 + 0.3 }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <NavLink
                                to={item.path}
                                className={`${baseLinkClass} ${isActive ? activeLinkClass : ''}`}
                            >
                                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-cyan-300' : 'text-purple-500'}`} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </NavLink>
                        </motion.div>
                    );
                })}
            </nav>

            <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
            >
                <button
                    className="w-full flex items-center justify-center p-3 rounded-lg bg-gray-800/70 text-red-400 transition duration-300 hover:bg-red-900/50 hover:text-white border border-red-500/30"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-sm">Logout Session</span>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Sidebar;