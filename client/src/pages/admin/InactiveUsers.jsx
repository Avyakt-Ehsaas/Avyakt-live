import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import API from '../../utils/axios';

const InactiveUsers = () => {
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [showInactiveUsers, setShowInactiveUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInactiveUsers = async () => {
    try {
      setIsLoading(true);
      const response = await API.get('/meetings/inactive-users');
      setInactiveUsers(response.data.data || []);
      setShowInactiveUsers(true);
    } catch (error) {
      console.error('Error fetching inactive users:', error);
      toast.error('Failed to fetch inactive users');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={fetchInactiveUsers}
        disabled={isLoading}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          isLoading 
            ? 'bg-amber-400 cursor-not-allowed' 
            : 'bg-amber-500 hover:bg-amber-600'
        } text-white`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Find Inactive Users (7+ days)
          </>
        )}
      </button>

      {showInactiveUsers && (
        <div className="mt-6 bg-white/90 rounded-xl shadow-sm border border-amber-100 p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Inactive Users (7+ days)</h3>
          {inactiveUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-100">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Total Sessions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-100">
                  {inactiveUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-amber-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.totalSessions || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-amber-700">No inactive users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InactiveUsers;
