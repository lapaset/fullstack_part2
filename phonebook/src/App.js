import React, { useState } from 'react';
import Numbers from './components/Numbers'

const Header = ({ text }) => <h2>{text}</h2>

const Input = ({ text, value, onChange }) => <div>{text} <input value={value} onChange={onChange} /></div>

const App = () => {

  const [ contacts, setContacts ] = useState([
    {
      name: 'Arto',
      number: '123456787'
    },
    {
      name: 'Arto H',
      number: '123456787'
    },
    {
      name: 'Ville',
      number: '123456787'
    },
    {
      name: 'Kalle Ville',
      number: '123456787'
    },
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterBy, setFilterBy ] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log('name exists: ', contacts.map(person => person.name).includes(newName))
    console.log('clicking: ', {newName})
    if (contacts.map(contact => contact.name).includes(newName))
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
        <form>
          <div>
            <Input text='filter shown with' value={filterBy} onChange={handleFilterChange} />
          </div>
        </form>
      
      <Header text='Add new' />
        <form>
          <div>
            <Input text='name:' value={newName} onChange={handleNameChange} />
            <Input text='number:' value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>add</button>
          </div>
        </form>
        <Header text='Numbers' />
        <Numbers contacts={contacts} filterBy={filterBy} />

    </div>
  );
}

export default App;
