import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

export default function TicketDetailPage({ ticketId, onBack }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState('');

  // Fetch ticket details
  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`);
        setTicket(response.data);
        setNewStatus(response.data.status);
      } catch (err) {
        setError('Failed to load ticket details.');
        console.error('Error fetching ticket:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newStatus && !newNote.trim()) {
      setError('Please enter a note or select a status');
      return;
    }

    setUpdating(true);
    setError('');
    setUpdateSuccess('');

    try {
      const updateData = {};
      if (newStatus && newStatus !== ticket.status) {
        updateData.status = newStatus;
      }
      if (newNote.trim()) {
        updateData.notes = newNote;
      }

      await axios.put(`${API_BASE_URL}/tickets/${ticketId}`, updateData);

      setUpdateSuccess('Ticket updated successfully!');
      setNewNote('');

      // Refresh ticket details
      const response = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`);
      setTicket(response.data);

      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update ticket.');
      console.error('Error updating ticket:', err);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Ticket Details" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading ticket...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Ticket Details" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!ticket) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Ticket Details" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back to Tickets
        </button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Success Message */}
        {updateSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            {updateSuccess}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{ticket.subject}</h1>
                  <p className="text-gray-600 mt-2">ID: {ticket.ticket_id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>

              <div className="border-t border-gray-200 py-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-gray-900 font-medium">{ticket.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900 font-medium">{ticket.customer_email}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Issue Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
              </div>

              <div className="border-t border-gray-200 py-6">
                <p className="text-sm text-gray-600">Created: {formatDate(ticket.created_at)}</p>
                <p className="text-sm text-gray-600">Last Updated: {formatDate(ticket.updated_at)}</p>
              </div>
            </div>

            {/* Notes Section */}
            {ticket.notes && ticket.notes.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes ({ticket.notes.length})</h2>
                <div className="space-y-4">
                  {ticket.notes.map((note) => (
                    <div key={note.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <p className="text-gray-700">{note.note_text}</p>
                      <p className="text-xs text-gray-500 mt-2">{formatDate(note.created_at)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Update Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Ticket</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Add Note */}
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                    Add Note
                  </label>
                  <textarea
                    id="note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note or update message..."
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={updating}
                  className={`w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition ${
                    updating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {updating ? 'Updating...' : 'Update Ticket'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
