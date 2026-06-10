import React from 'react';

const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-red-100 text-red-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Closed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function TicketCard({ ticket, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition cursor-pointer p-4"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
          <p className="text-sm text-gray-500 mt-1">{ticket.customer_name}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-600">{ticket.customer_email}</p>
          <p className="text-xs text-gray-500 mt-1">ID: {ticket.ticket_id}</p>
        </div>
        <p className="text-xs text-gray-500 text-right">
          {formatDate(ticket.created_at)}
        </p>
      </div>
    </div>
  );
}
