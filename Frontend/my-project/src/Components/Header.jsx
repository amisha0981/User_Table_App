import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg z-20">
      <div className="container">
        <h1 className="text-2xl font-bold ">User Management</h1>
      </div>
    </header>
  );
};

export default Header;