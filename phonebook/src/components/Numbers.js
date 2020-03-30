import React from 'react';

const Contact = ({ contact }) => <p>{contact.name} {contact.number}</p>

const Numbers = ({ contacts, filterBy }) => {
    
  const show = (contact, filterBy) => contact.name.toLowerCase().includes(filterBy.toLowerCase())

  return (
    contacts.filter(contact => show(contact, filterBy))
    .map(contact => 
    <Contact key={contact.name} contact={contact} />)
)}

export default Numbers;