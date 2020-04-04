import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = newContact => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateContact = updatedContact => {
  const request = axios.put(`${baseUrl}/${updatedContact.id}`, updatedContact)
  return request.then(response => response.data)
}

export default { getAll, createContact, deleteContact, updateContact }