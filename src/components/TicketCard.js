import React from 'react';
import '../styles/styles.css'; // Import the CSS file
function TicketCard({ ticket }) {

  return (
    <div className="ticket-card">
      <div className="ticket-user-id">{ticket.userId}</div>
      <div className="ticket-id">{ticket.id}</div>
      <div className="ticket-title">{ticket.title}</div>
      <div className="ticket-tag">{ticket.tag}</div>
    </div>
  );
}

// Helper function to get the priority label based on the priority level
function getPriorityLabel(priority) {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'No priority';
  }
}

export default TicketCard;
