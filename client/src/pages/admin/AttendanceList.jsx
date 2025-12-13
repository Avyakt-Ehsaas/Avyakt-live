import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Calendar, Clock3, CheckCircle, XCircle } from 'lucide-react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loader from '../../components/ui/Loader';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    className="bg-white/90 border border-green-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${color}` })}
      </div>
    </div>
  </motion.div>
);

const AttendanceList = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({
    total: 0,
    present: 0,
    absent: 0,
    averageDuration: 0,
    attendees: []
  });

  useEffect(() => {
    const fetchTodaysAttendance = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        const response = await API.get(`/meetings/todays-attendance?date=${today}`);
        
        if (response.data.success) {
          setAttendance(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        toast.error('Failed to load attendance data');
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysAttendance();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Sessions"
          value={attendance.total}
          icon={<Calendar />}
          color="text-blue-500"
        />
        <StatCard
          title="Present"
          value={attendance.present}
          icon={<CheckCircle />}
          color="text-green-500"
        />
        <StatCard
          title="Absent"
          value={attendance.absent}
          icon={<XCircle />}
          color="text-red-500"
        />
        <StatCard
          title="Avg. Duration"
          value={`${attendance.averageDuration}m`}
          icon={<Clock3 />}
          color="text-purple-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            Today's Attendance Records
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.attendees.length > 0 ? (
                attendance.attendees.map((attendee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {attendee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(attendee.joinTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(attendee.duration / 60)}m {attendee.duration % 60}s
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        attendee.status === 'present' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No attendance records found for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;