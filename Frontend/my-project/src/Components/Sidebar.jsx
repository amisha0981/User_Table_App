import React from 'react';

const Sidebar = () => {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 text-white p-6 shadow-lg">
      <nav>
        <ul className="space-y-3">
          <li>
            <a href="#" className="block p-3 rounded-lg hover:bg-gray-600 transition-colors duration-200">Home</a>
          </li>
          <li>
            <a href="#" className="block p-3 rounded-lg hover:bg-gray-600 transition-colors duration-200">Users</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


