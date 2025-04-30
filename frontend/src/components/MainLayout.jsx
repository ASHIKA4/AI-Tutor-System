import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
