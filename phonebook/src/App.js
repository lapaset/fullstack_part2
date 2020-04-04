import React, { useState, useEffect } from 'react';
import Numbers from './components/Numbers'
import ContactForm from './components/ContactForm';
import FilterForm from './components/FilterForm';
import contactsService from './services/contacts';

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')

  useEffect(() => {
    contactsService
      .getAll()
      .then(response => {
        setContacts(response)
      })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    if (contacts.map(c => c.name).includes(newName)) {
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contactToUpdate = contacts.find(c => c.name === newName)
        const updatedContact = { ...contactToUpdate, number: newNumber}

        contactsService
          .updateContact(updatedContact)
          .then(updatedContact => {
            setContacts(contacts.map(c => c.id !== contactToUpdate.id ? c : updatedContact))
          })
      }

    } else {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      contactsService
        .createContact(contactObject)
        .then(response => {
          setContacts(contacts.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }

  }

  const deleteContactId = id => {

    const contactName = contacts.find(c => c.id === id).name

    if (contactName === undefined) {
      alert(`The contact has already been removed`)
      setContacts(contacts.filter(c => c.id !== id))
    }

    if (window.confirm(`Delete ${contactName}?`) === false)
      return

    contactsService
      .deleteContact(id)
      .then(() => setContacts(contacts.filter(c => c.id !== id)))
      .catch(() => {
        alert(`${contactName} has already been removed`)
        setContacts(contacts.filter(c => c.id !== id))
      })
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilterBy(event.target.value)

  return (
    <div>
      <Header text='Phonebook' />
        <FilterForm
          filterBy={filterBy}
          handleFilterChange={handleFilterChange} />      
      <Header text='Add new' />
        <ContactForm
          name={newName}
          number={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          handleSubmit={handleSubmit} />
      <Header text='Numbers' />
        <Numbers
          contacts={contacts}
          filterBy={filterBy}
          deleteContactId={deleteContactId} />
    </div>
  );
}

export default App;
