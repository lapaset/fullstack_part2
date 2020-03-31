import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDisplay from './components/CountryDisplay';
import FilterForm from './components/FilterForm';

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountries, setSelectedCountries] = useState([])
  const [weather, setWeather] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = event => {
    const isSelected = (country, f) => country.name.toLowerCase().includes(f.toLowerCase())

    setFilter(event.target.value)
    setSelectedCountries(countries.filter(country => isSelected(country, event.target.value)))
  }

  const handleShow = countries => setSelectedCountries(countries)
  
  const handleWeather = weather => setWeather(weather)

  return (
    <div>
      <FilterForm filter={filter} handler={handleFilterChange} />
      <CountryDisplay countries={selectedCountries} handleShow={handleShow} weather={weather} handleWeather={handleWeather} />
    </div>
  );
}

export default App;
