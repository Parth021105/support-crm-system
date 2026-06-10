import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TicketListPage from './pages/TicketListPage';
import CreateTicketPage from './pages/CreateTicketPage';
import TicketDetailPage from './pages/TicketDetailPage';
import './styles/index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('list'); // 'list', 'create', 'detail'
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleSelectTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setCurrentPage('list');
    setSelectedTicketId(null);
  };

  const handleTicketCreated = () => {
    setCurrentPage('list');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedTicketId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      <div className="min-h-screen">
        {currentPage === 'list' && (
          <TicketListPage onSelectTicket={handleSelectTicket} />
        )}
        {currentPage === 'create' && (
          <CreateTicketPage onTicketCreated={handleTicketCreated} />
        )}
        {currentPage === 'detail' && selectedTicketId && (
          <TicketDetailPage ticketId={selectedTicketId} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
