import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status'); // Default grouping option
  const [sortingOption, setSortingOption] = useState('priority'); // Default sorting option
  const [dataLoaded, setDataLoaded] = useState(false); // New state for data loading

  useEffect(() => {
    // Fetch data from the API and set it in the state
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setDataLoaded(true); // Set dataLoaded to true when data is available
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once

  // Function to handle grouping option change
  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  // Function to handle sorting option change
  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };
 

// Helper function to group tickets based on the selected grouping option
function groupTicketsByOption(tickets, groupingOption) { 
  console.log('tickets inside groupTicketsByOption',tickets);
  const groupedTickets = {};

  // Iterate through the tickets
  tickets.forEach((ticket) => {
    const groupByValue = ticket[groupingOption];

    // Check if the group already exists, if not, create it
    if (!groupedTickets[groupByValue]) {
      groupedTickets[groupByValue] = {
        groupName: groupByValue, // Use the groupByValue as the group name
        tickets: [],
      };
    }

    // Add the ticket to the corresponding group
    groupedTickets[groupByValue].tickets.push(ticket);
  });
  console.log('groupedTickets',groupedTickets);
  return groupedTickets;
}




// Function to group tickets based on the selected grouping option
const groupTickets = (tickets, groupingOption) => {
    console.log('tickets inside groupTickets',tickets);
    return groupTicketsByOption(tickets,groupingOption);

};



// Function to sort tickets based on the selected sorting option
const sortTickets = (tickets, sortingOption) => {
  console.log('tickets inside sortTickets', tickets);

  // Convert the object of groups into an array
  const groupsArray = Object.values(tickets);

  // Flatten the array of groups into a single array of tickets
  const allTickets = groupsArray.reduce((accumulator, group) => {
    return accumulator.concat(group.tickets);
  }, []);

  if (!Array.isArray(allTickets)) {
    return []; // Return an empty array if 'allTickets' is not iterable
  }

  // Create a copy of the allTickets array to avoid mutating the original array
  const sortedTickets = [...allTickets];

  if (sortingOption === 'priority') {
    // Sort by priority in descending order
    console.log('Sorting by priority');
    sortedTickets.sort((a, b) => b.priority - a.priority);
  } else if (sortingOption === 'title') {
    // Sort by title in ascending order
    console.log('Sorting by title');
    sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Return the sorted tickets
  console.log('sortedTickets', sortedTickets);
  return sortedTickets;
};





  // Group and sort tickets based on user selections
  const groupedAndSortedTickets = sortTickets(groupTickets(tickets, groupingOption), sortingOption);
  console.log('groupedAndSortedTickets',groupedAndSortedTickets);
  return (
    <div className="App">
      {/* Dropdown for grouping option */}
      <label htmlFor="groupingDropdown">Group By:</label>
      <select
        id="groupingDropdown"
        value={groupingOption}
        onChange={handleGroupingChange}
      >
        <option value="status">Status</option>
        <option value="userId">User</option>
        <option value="priority">Priority</option>
      </select>

      {/* Dropdown for sorting option */}
      <label htmlFor="sortingDropdown">Sort By:</label>
      <select
        id="sortingDropdown"
        value={sortingOption}
        onChange={handleSortingChange}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>

      {/* Render the KanbanBoard component */}
      {dataLoaded ? (
        <KanbanBoard
          tickets={groupedAndSortedTickets}
          groupingOption={groupingOption}
          sortingOption={sortingOption}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
