import React from 'react';
import Country from './Country';
import ListCountry from './ListCountry';

const CountryDisplay = ({ countries, handleShow, weather, handleWeather }) => {

  console.log(countries)

  if (countries.length > 10)
    return <div><p>Too many matches, specify another filter</p></div>
  
  else if (countries.length === 1)
    return <Country country={countries[0]} weather={weather} handleWeather={handleWeather} />

  else {
    return (
      <div>
        {countries
          .map(country => <ListCountry key={country.alpha2Code} country={country} handleShow={handleShow} />)} 
      </div>
    )
  }
}

export default CountryDisplay;