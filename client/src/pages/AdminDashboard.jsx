import React from "react";
import { motion } from "framer-motion";
import { Users, BarChart3, Activity, Calendar, Settings, Shield, Zap, TrendingUp, Clock } from "lucide-react";

const DUMMY_DASHBOARD_DATA = {
    totalUsers: 12450,
    newUsersThisMonth: 890,
    activeUsers: 4200,
    todaysAttendance: 1550,
    userGrowthRate: 7.2,
    totalSessions: 58900,
    averageSessionDuration: 22,
    conversionRate: 15.8,
};

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
};

const Card = ({ children, className }) => <div className={`bg-gray-800/70 backdrop-blur-sm border border-blue-600/30 rounded-2xl shadow-2xl ${className}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-6 ${className}`}>{children}</div>;
const Button = ({ children, className }) => <div className={`bg-gray-700/50 border border-cyan-500/50 text-cyan-300 hover:bg-gray-600/70 transition duration-300 ${className}`}>{children}</div>;


const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

export default function AdminDashboard() {
    const dashboardData = DUMMY_DASHBOARD_DATA;

    return (
        <div className="ml-[15rem] p-10 min-h-screen bg-gray-900 text-gray-100">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <motion.h1 className="text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                    <Zap className="inline-block w-8 h-8 mr-3 text-cyan-400" />
                    SYSTEM CORE DASHBOARD
                </motion.h1>
                <motion.p className="text-lg text-gray-400 pl-11">
                    Monitoring Real-time Community Metrics
                </motion.p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={item}>
                    <Card className="hover:border-cyan-400 transition duration-300">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Users</p>
                                <p className="text-4xl font-extrabold text-cyan-300 mt-1">
                                    {formatNumber(dashboardData?.totalUsers || 0)}
                                </p>
                                <p className="text-sm text-lime-400 mt-2">
                                    +{formatNumber(dashboardData?.newUsersThisMonth || 0)} <span className="text-gray-400">new this month</span>
                                </p>
                            </div>
                            <div className="bg-cyan-500/10 p-4 rounded-full border border-cyan-500/50">
                                <Users className="w-7 h-7 text-cyan-400" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="hover:border-purple-400 transition duration-300">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Active Users (30D)</p>
                                <p className="text-4xl font-extrabold text-purple-400 mt-1">
                                    {formatNumber(dashboardData?.activeUsers || 0)}
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    <TrendingUp className="inline w-4 h-4 mr-1 text-purple-400" /> High Engagement Rate
                                </p>
                            </div>
                            <div className="bg-purple-500/10 p-4 rounded-full border border-purple-500/50">
                                <Activity className="w-7 h-7 text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="hover:border-yellow-400 transition duration-300">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Total Sessions Logged</p>
                                <p className="text-4xl font-extrabold text-yellow-400 mt-1">
                                    {formatNumber(dashboardData?.totalSessions || 0)}
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    <Clock className="inline w-4 h-4 mr-1 text-yellow-400" /> {dashboardData?.averageSessionDuration} min avg.
                                </p>
                            </div>
                            <div className="bg-yellow-500/10 p-4 rounded-full border border-yellow-500/50">
                                <Calendar className="w-7 h-7 text-yellow-400" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={item}>
                    <Card className="hover:border-lime-400 transition duration-300">
                        <CardContent className="flex justify-between items-center p-6">
                            <div>
                                <p className="text-sm font-medium text-gray-400">Growth Rate</p>
                                <p className="text-4xl font-extrabold text-lime-400 mt-1">
                                    {formatNumber(dashboardData?.userGrowthRate || 0)}%
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    <BarChart3 className="inline w-4 h-4 mr-1 text-lime-400" /> MoM Performance
                                </p>
                            </div>
                            <div className="bg-lime-500/10 p-4 rounded-full border border-lime-500/50">
                                <BarChart3 className="w-7 h-7 text-lime-400" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <Card className="rounded-2xl shadow-xl">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 text-gray-300 flex items-center gap-2 border-b border-gray-700 pb-3">
                            <Settings className="w-6 h-6 text-cyan-400" /> ACCESS CONSOLES
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Users className="w-6 h-6 text-cyan-400" />
                                <span className="text-sm font-medium">Manage Users</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Calendar className="w-6 h-6 text-purple-400" />
                                <span className="text-sm font-medium">Schedule</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <BarChart3 className="w-6 h-6 text-lime-400" />
                                <span className="text-sm font-medium">Analytics</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Shield className="w-6 h-6 text-yellow-400" />
                                <span className="text-sm font-medium">Security Audit</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Activity className="w-6 h-6 text-red-400" />
                                <span className="text-sm font-medium">Activity Logs</span>
                            </Button>
                            <Button className="flex flex-col h-28 items-center justify-center gap-2 rounded-xl text-lg hover:text-white">
                                <Settings className="w-6 h-6 text-gray-400" />
                                <span className="text-sm font-medium">System Config</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-xl">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 text-gray-300 flex items-center gap-2 border-b border-gray-700 pb-3">
                            <Activity className="w-6 h-6 text-purple-400" /> REAL-TIME FEED
                        </h2>
                        <div className="space-y-4">
                            {[
                                { id: 1, user: "John Doe", action: "completed a session", time: "2 min ago", color: 'cyan' },
                                { id: 2, user: "Jane Smith", action: "joined the community", time: "15 min ago", color: 'purple' },
                                { id: 3, user: "Alex Johnson", action: "reached 7-day streak", time: "1 hour ago", color: 'lime' },
                                { id: 4, user: "Sam Wilson", action: "triggered tree level up", time: "2 hours ago", color: 'yellow' },
                                { id: 5, user: "User 993", action: "login attempt success", time: "3 hours ago", color: 'gray' },
                            ].map((item) => (
                                <motion.div 
                                    key={item.id}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(50, 50, 50, 0.5)' }}
                                    className="flex items-center gap-4 p-3 rounded-xl border border-gray-700/50 cursor-pointer transition duration-200"
                                >
                                    <div className={`w-3 h-3 rounded-full bg-${item.color}-400 animate-pulse`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            <span className={`font-extrabold text-${item.color}-300`}>{item.user}</span> {item.action}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                                    </div>
                                    <Zap className={`w-4 h-4 text-${item.color}-400`} />
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}