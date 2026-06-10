import React from 'react';

export default function Navigation({ currentPage, onNavigate }) {
  const getNavClass = (page) => {
    const baseClass = 'px-3 py-2 rounded-md text-sm font-medium transition';
    const isActive = currentPage === page;
    return isActive
      ? `${baseClass} bg-blue-600 text-white`
      : `${baseClass} text-gray-700 hover:text-gray-900 hover:bg-gray-200`;
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate('list')}
              className={getNavClass('list')}
            >
              All Tickets
            </button>
            <button
              onClick={() => onNavigate('create')}
              className={getNavClass('create')}
            >
              New Ticket
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
