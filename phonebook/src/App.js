import React, { useState, useEffect } from 'react';
import Numbers from './components/Numbers'
import ContactForm from './components/ContactForm';
import FilterForm from './components/FilterForm';
import contactsService from './services/contacts';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const [ contacts, setContacts ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    contactsService
      .getAll()
      .then(response => {
        setContacts(response)
      })
  }, [])

  const handleSubmit = event => {

    const confirmChange = text => {
      setNotification(`${text} ${newName}`)
      setTimeout(() => setNotification(null), 3000)
      setNewName('')
      setNewNumber('')
    }

    event.preventDefault()
    
    if (contacts.map(c => c.name).includes(newName)) {  
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contactToUpdate = contacts.find(c => c.name === newName)
        const updatedContact = { ...contactToUpdate, number: newNumber}

        contactsService
          .updateContact(updatedContact)
          .then(updatedContact => {
            setContacts(contacts
              .map(c => c.id !== contactToUpdate.id ? c : updatedContact))
            confirmChange('Updated')
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
          confirmChange('Added')
        })
    }

  }

  const deleteContactId = id => {

    const contactAlreadyRemoved = name => {
      setErrorMessage(`${name} has already been deleted`)
      setTimeout(() => setErrorMessage(null), 3000)
      setContacts(contacts.filter(c => c.id !== id))
    }

    const contactName = contacts.find(c => c.id === id).name

    if (contactName === undefined)
      contactAlreadyRemoved('Contact')

    if (window.confirm(`Delete ${contactName}?`) === false)
      return

    contactsService
      .deleteContact(id)
      .then(() => {
        setNotification(`Deleted ${contactName}`)
        setContacts(contacts.filter(c => c.id !== id))
      })
      .catch(() => contactAlreadyRemoved(contactName))
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilterBy(event.target.value)

  const notificationStyle ={
		color: 'red',
		background: 'thistle',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10        
  }
  
  return (
    <div>
      <Header text='Phonebook' />
      <ErrorNotification message={errorMessage} notificationStyle={notificationStyle} />
      <Notification message={notification} notificationStyle={notificationStyle} />
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
