import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API from "../../../utils/api";


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LastThreeMonthsAttendanceChart = () => {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get("/meetings/last-Three-month-attendees");

      const formatted = res.data.data.map((item) => {
        const m = item._id.month - 1; // MongoDB months are 1–12
        return {
          month: `${monthNames[m]}`,
          attendees: item.totalMonthlyAttendees || 0,
        };
      });

      setChartData(formatted);
    } catch (error) {
      console.log("Error fetching attendance graph:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Last 3 Months Attendance</h2>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="attendees" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LastThreeMonthsAttendanceChart;
