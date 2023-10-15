import React from 'react';
import TicketCard from './TicketCard';
import '../styles/styles.css'; // Import the CSS file

// Map priority values to their corresponding names
const priorityNames = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};
function KanbanBoard({ tickets, groupingOption, sortingOption }) {
  // Group tickets based on the selected grouping option 
  const groupedTickets = groupTickets(tickets, groupingOption);

  // Sort tickets based on the selected sorting option
  const sortedTickets = sortTickets(groupedTickets, sortingOption);
  return (
    <div className="kanban-board">
      {Object.keys(sortedTickets).map((group, index) => (
        <div key={index} className="group-section">
          <h2 className="group-name">
            {groupingOption === 'priority'
              ? priorityNames[group]
              : sortedTickets[group].groupName}{' '}
            {sortedTickets[group].tickets.length} 
          </h2>
          <div className="ticket-list">
            {sortedTickets[group].tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to group tickets based on the selected grouping option
function groupTickets(tickets, groupingOption) {
  // Return an array of grouped tickets with groupName and tickets properties
  // Example structure: [{ groupName: 'Group Name', tickets: [...] }]
  const grouped = {};
  tickets.forEach((ticket) => {
    const groupValue = ticket[groupingOption];

    if (!grouped[groupValue]) {
      grouped[groupValue] = [];
    }

    grouped[groupValue].push(ticket);
  });

  const groupedTickets = Object.keys(grouped).map((groupName) => ({
    groupName,
    tickets: grouped[groupName],
  }));

  return groupedTickets;
}

// Helper function to sort tickets based on the selected sorting option
function sortTickets(groupedTickets, sortingOption) {

  // Return an array of sorted tickets 

  const sorted = groupedTickets.map((group) => ({
    groupName: group.groupName,
    tickets: [...group.tickets],
  }));

  sorted.forEach((group) => {
    if (sortingOption === 'priority') {
      group.tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === 'title') {
      group.tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
  });
  return sorted;
}

export default KanbanBoard;
