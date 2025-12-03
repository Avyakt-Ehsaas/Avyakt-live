import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

// ✅ Modern Stat Card (No CountUp)
const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 flex justify-between items-center shadow-2xl hover:shadow-[0_0_35px_rgba(0,255,255,0.25)] transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div>
        <p className="text-cyan-300 text-sm mb-1">{title}</p>

        <h2 className={`text-4xl font-extrabold ${color}`}>
          {value.toLocaleString()}
        </h2>
      </div>

      <div className={`text-4xl opacity-90 ${color}`}>{icon}</div>
    </motion.div>
  );
};

const Analytics = () => {
  const [data] = useState({
    users: 2450,
    revenue: 125430,
    meetings: 128,
    growth: 18,
  });

  return (
    <div className="min-h-screen bg-[#05080f] text-white p-8 ml-64">

      {/* ✅ Title */}
      <motion.h1
        className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Analytics Dashboard
      </motion.h1>

      {/* ✅ Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        <StatCard
          title="Total Users"
          value={data.users}
          icon={<FaUsers />}
          color="text-cyan-400"
        />

        <StatCard
          title="Total Revenue (₹)"
          value={data.revenue}
          icon={<FaMoneyBillWave />}
          color="text-pink-500"
        />

        <StatCard
          title="Total Meetings"
          value={data.meetings}
          icon={<FaCalendarAlt />}
          color="text-fuchsia-400"
        />

        <StatCard
          title="Growth Rate %"
          value={`${data.growth}%`}
          icon={<FaChartLine />}
          color="text-cyan-300"
        />

      </div>

      {/* ✅ Left & Right Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">

        {/* LEFT */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 h-[360px] shadow-[0_0_30px_rgba(0,255,255,0.15)]"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            User Growth
          </h2>

          <div className="w-full h-full bg-black/40 rounded-xl flex items-center justify-center text-cyan-300">
            ( User Growth Graph )
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6 h-[360px] shadow-[0_0_30px_rgba(255,0,200,0.15)]"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-semibold text-pink-400 mb-4">
            Revenue / Price Analytics
          </h2>

          <div className="flex flex-col justify-center items-center h-full">

            <p className="text-cyan-300 mb-3">
              Total Income This Month
            </p>

            <h1 className="text-5xl font-extrabold text-pink-500 drop-shadow-[0_0_15px_rgba(255,0,200,0.8)]">
              ₹ {data.revenue.toLocaleString()}
            </h1>

            <p className="mt-4 text-cyan-400">
              +18% higher than last month
            </p>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;
