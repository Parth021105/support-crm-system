import React from 'react';

export default function Header({ title = 'Support CRM System' }) {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-blue-100 mt-1">Customer Support Ticket Management System</p>
      </div>
    </header>
  );
}
