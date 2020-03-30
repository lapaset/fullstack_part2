import React from 'react';
import Input from './Input';

const ContactForm = ({ name, number, handleNameChange, handleNumberChange, handleSubmit}) => (
    <form>
      <div>
        <Input text='name:' value={name} onChange={handleNameChange} />
        <Input text='number:' value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
  )

export default ContactForm;