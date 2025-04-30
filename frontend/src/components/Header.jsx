import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-3xl font-semibold">Welcome back, John!</h1>
      <button className="bg-gray-100 p-2 rounded">
        🔔
      </button>
    </div>
  );
};

export default Header;
