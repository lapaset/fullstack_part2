import React from 'react';

const Contact = ({ contact, deleteContact }) => (
  <p>
    {contact.name} {contact.number}
    <button onClick={deleteContact}>Delete</button>
  </p>
)

const Numbers = ({ contacts, filterBy, deleteContactId }) => {
    
  const show = (contact, filterBy) => contact.name.toLowerCase().includes(filterBy.toLowerCase())

  return (
    contacts
      .filter(contact => show(contact, filterBy))
      .map(contact => 
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={() => deleteContactId(contact.id)} />)
)}

export default Numbers;