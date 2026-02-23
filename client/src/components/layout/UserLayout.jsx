import React from 'react';
import UserNavbar from './Sidebar/UserNavbar';

const UserLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
          <UserNavbar />
           <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
