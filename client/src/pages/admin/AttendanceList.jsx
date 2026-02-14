import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Calendar, Clock3, CheckCircle, XCircle, BarChart2, CheckSquare } from 'lucide-react';
import API from '../../utils/api';
import { toast } from 'react-hot-toast';
import Loader from '../../components/ui/Loader';
import InactiveUsers from './InactiveUsers';

import ExcelJS from 'exceljs';

// Color scheme matching AdminDashboard
const colors = {
  // Background colors
  bgPrimary: '#F8FAFC',
  bgSecondary: '#FFFFFF',
  bgHover: '#F1F5F9',
  
  // Primary colors (emerald)
  primary: '#10B981',
  primaryLight: '#A7F3D0',
  primaryDark: '#059669',
  
  // Text colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Borders and dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Additional colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Gradients
  gradientPrimary: 'from-emerald-500 to-teal-600',
  gradientHover: 'from-emerald-600 to-teal-700'
};


const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    className="bg-white/90 border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between"
    style={{ backgroundColor: colors.bgSecondary, borderColor: colors.border }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>{title}</p>
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.textPrimary }}>{value}</h2>
      </div>
      <div className="p-2 sm:p-3 rounded-lg ml-4" style={{ backgroundColor: `${color}20` }}>
        {React.cloneElement(icon, { 
          className: 'w-5 h-5 sm:w-6 sm:h-6',
          style: { color: color }
        })}
      </div>
    </div>
  </motion.div>
);

const AttendanceList = () => {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('check'); // 'check' or 'mark'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
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


const exportToExcel = async () => {
  try {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Today's Attendance");
    
    // Add headers
    const headers = ['Name', 'Email', 'Join Time', 'Duration (minutes)', 'Status'];
    worksheet.addRow(headers);
    
    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { rgb: 'FF10B981' } };
    headerRow.font = { bold: true, color: { rgb: 'FFFFFFFF' } };
    
    // Set column widths
    worksheet.columns = [
      { width: 25 }, // Name
      { width: 30 }, // Email
      { width: 25 }, // Join Time
      { width: 20 }, // Duration
      { width: 15 }  // Status
    ];
    
    // Add data rows
    attendance.attendees.forEach(attendee => {
      worksheet.addRow([
        attendee.name || 'N/A',
        attendee.email || 'N/A',
        attendee.joinTime ? new Date(attendee.joinTime).toLocaleString() : 'N/A',
        attendee.duration ? (attendee.duration / 60).toFixed(2) : 'N/A',
        attendee.status || 'N/A'
      ]);
    });
    
    // Generate Excel file and trigger download
    const fileName = `attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('Export successful!');
  } catch (error) {
    console.error('Export failed:', error);
    toast.error('Failed to export attendance data');
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      setSelectedFile(file);
    } else {
      toast.error('Please upload a valid Excel file (.xlsx or .xls)');
      event.target.value = '';
    }
  }
};

const uploadAttendanceData = async () => {
  if (!selectedFile) {
    toast.error('Please select a file first');
    return;
  }

  try {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('attendanceFile', selectedFile);

    const response = await API.post('/meetings/upload-attendance', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      toast.success('Attendance data uploaded successfully!');
      setSelectedFile(null);
      document.querySelector('input[type="file"]').value = '';
      
      // Refresh the attendance data
      const today = new Date().toISOString().split('T')[0];
      const attendanceResponse = await API.get(`/meetings/todays-attendance?date=${today}`);
      if (attendanceResponse.data.success) {
        setAttendance(attendanceResponse.data.data);
      }
    } else {
      toast.error(response.data.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    toast.error(error.response?.data?.message || 'Failed to upload attendance data');
  } finally {
    setUploading(false);
  }
};


  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-scroll p-10 min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.textPrimary }}>Attendance Dashboard</h1>
            <p className="text-sm sm:text-base mt-1" style={{ color: colors.textSecondary }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

              {/* Toggle Button */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border shadow-sm" style={{ borderColor: colors.border }}>
            <button
              onClick={() => setActiveView('check')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg transition-all duration-200 flex items-center gap-2 ${
                activeView === 'check'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Check Today's Attendance
            </button>
            <button
              onClick={() => setActiveView('mark')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg transition-all duration-200 flex items-center gap-2 ${
                activeView === 'mark'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              Mark Attendance
            </button>
          </div>
        </div>
         
        </div>

    

        {/* Content based on active view */}
        {activeView === 'check' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Sessions"
                value={attendance.total}
                icon={<Calendar />}
                color={colors.info}
              />
              <StatCard
                title="Present"
                value={attendance.present}
                icon={<CheckCircle />}
                color={colors.success}
              />
              <StatCard
                title="Absent"
                value={attendance.absent}
                icon={<XCircle />}
                color={colors.error}
              />
              <StatCard
                title="Avg. Duration"
                value={`${Math.floor(attendance.averageDuration)}m`}
                icon={<Clock3 />}
                color={colors.warning}
              />
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: colors.border }}>
              <div className="p-4 sm:p-6 border-b" style={{ borderColor: colors.border, backgroundColor: colors.bgSecondary }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: colors.textPrimary }}>
                      <Users className="w-5 h-5" style={{ color: colors.textPrimary }} />
                      Today's Attendance Records
                    </h2>
                    <p className="text-xs sm:text-sm mt-1" style={{ color: colors.textSecondary }}>
                      Showing all attendance records for today
                    </p>
                  </div>
                  <div className="flex justify-between items-center ml-2 mb-6 gap-6 ">
                    <h2 className="text-2xl font-bold text-gray-800">Today's Attendance</h2>
                    <button
                      onClick={exportToExcel}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      disabled={!attendance.attendees?.length}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-opacity-30" style={{ borderColor: colors.border }}>
                  <thead>
                    <tr style={{ backgroundColor: colors.primaryLight + '80' }}>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textPrimary }}>
                        Name
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell" style={{ color: colors.textPrimary }}>
                        Email
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider hidden md:table-cell" style={{ color: colors.textPrimary }}>
                        Join Time
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textPrimary }}>
                        Duration
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textPrimary }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-opacity-30" style={{ backgroundColor: 'white' }}>
                    {attendance.attendees.length > 0 ? (
                      attendance.attendees.map((attendee, index) => (
                        <tr 
                          key={index} 
                          className="hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: index % 2 === 0 ? colors.white : colors.bgHover }}
                        >
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium" style={{ color: colors.textPrimary }}>
                                {(attendee.name).substring(0,1).toUpperCase() + (attendee.name).substring(1)}
                                </div>
                            <div className="text-xs sm:hidden" style={{ color: colors.textSecondary }}>{attendee.email}</div>
                            <div className="text-xs md:hidden mt-1 flex items-center" style={{ color: colors.textSecondary }}>
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(attendee.joinTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell" style={{ color: colors.textSecondary }}>
                            {attendee.email}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell" style={{ color: colors.textSecondary }}>
                            {new Date(attendee.joinTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.textPrimary }}>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                              style={{ backgroundColor: colors.primaryLight, color: colors.primaryDark }}>
                              {Math.floor(attendee.duration / 60)}h {attendee.duration % 60}m
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        <td colSpan="5" className="px-6 py-8 text-center text-sm" style={{ color: colors.textSecondary }}>
                          <div className="flex flex-col items-center justify-center">
                            <Users className="w-10 h-10 mb-2 opacity-40" />
                            <p>No attendance records found for today.</p>
                            <p className="text-xs mt-1">Check back later or refresh the page.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border shadow-sm p-8" style={{ borderColor: colors.border }}>
            <div className="text-center py-12">
              <CheckSquare className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>Mark Attendance</h2>
              <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
                Upload an Excel sheet to mark attendance manually.
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <input 
                  type="file" 
                  accept=".xlsx, .xls" 
                  onChange={handleFileUpload} 
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100
                    cursor-pointer
                  "
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">Selected file: <span className="font-medium">{selectedFile.name}</span></p>
                )}
              </div>

              <button
                onClick={uploadAttendanceData}
                disabled={!selectedFile || uploading}
                className={`px-8 py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
                  selectedFile && !uploading 
                    ? 'bg-emerald-600 hover:bg-emerald-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {uploading ? 'Uploading...' : 'Upload Attendance'}
              </button>

              <div className="max-w-md mx-auto mt-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Ensure your Excel sheet has 'First Name', 'Last Name', 'Email', 'Joined Time', and 'Duration (min)' columns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Inactive Users Section - appears in both views */}
        <div className="mt-12">
          <InactiveUsers />
        </div>
        
      </div>
    </div>
  );
};

export default AttendanceList;