import React, { useState } from 'react';
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  
  // Initializes the contacts state with the first 5 contacts from the contactsData array.
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  //  Initializes the remainingContacts state with the contacts that are not initially displayed (starting from the 6th contact).
  const [remainingContacts, setRemainingContacts] = useState(contactsData.slice(5));


  // Function called when the "Add Random Contact" button is clicked
  const addRandomContact = () => {
  // Check if there are not more contacts left to add, and if so, shows an alert
  if (remainingContacts.length === 0) {
    alert ('No more contacts to add!');
    return;
  } 
  // Generate a random index to select a contact from remainingContacts
  const randomIndex = Math.floor(Math.random() * remainingContacts.length); 
  // the randomly selected contact.
  const randomContact = remainingContacts[randomIndex];

  // Updates the contacts state by adding the random contact to the existing contacts.
  setContacts((prevContacts) => [...prevContacts, randomContact]);

  // Update the remainingContacts state by removing the selected contact
  setRemainingContacts((prevRemainingContacts) => prevRemainingContacts.filter((contact) => contact.id !== randomContact.id)
  );
};


// Sorts the contacts array alphabetically by name using the localeCompare function.
  const sortContactsByName = () => {
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  setContacts(sortedContacts);
};

// sortContactsByPopularity: Sorts the contacts array by popularity in descending order.
  const sortContactsByPopularity = () => {
  const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
  setContacts(sortedContacts);
};

  const deleteContact = (id) => {
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  setContacts(updatedContacts);
};

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button> 
      <button onClick={sortContactsByName}>Sort by Name</button>
      <button onClick={sortContactsByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar && <p>🏆</p>}</td>
              <td>{contact.wonEmmy && <p>🌟</p>}</td>
              <td><button onClick={() => deleteContact(contact.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
