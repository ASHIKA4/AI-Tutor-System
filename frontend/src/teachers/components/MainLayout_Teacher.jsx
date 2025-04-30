import React from 'react';

import { Outlet } from 'react-router-dom';
import Sidebar_Teacher from './Sidebar_Teacher';

const MainLayout_Teacher = () => {
  return (
    <div className="d-flex">
      <Sidebar_Teacher />
      <main className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout_Teacher;