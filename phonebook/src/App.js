import React, { useState, useEffect } from 'react';
import Numbers from './components/Numbers'
import ContactForm from './components/ContactForm';
import FilterForm from './components/FilterForm';
import axios from 'axios';

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')

  const hook = () => {

    axios
      .get('http://localhost:3001/contacts')
      .then(response => {
        setContacts(response.data)
      })
  }

  useEffect(hook, [])

  const handleSubmit = event => {
    event.preventDefault()
    if (contacts.map(contact => contact.name)
        .includes(newName))
      window.alert(`${newName} is already added to phonebook`)
    else {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      setContacts(contacts.concat(contactObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilterBy(event.target.value)

  return (
    <div>
      <Header text='Phonebook' />
        <FilterForm filterBy={filterBy} handleFilterChange={handleFilterChange} />      
      <Header text='Add new' />
        <ContactForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <Header text='Numbers' />
        <Numbers contacts={contacts} filterBy={filterBy} />
    </div>
  );
}

export default App;
