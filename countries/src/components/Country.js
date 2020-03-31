import React from 'react';
import Weather from './Weather';

const Language = ({ name }) => <li>{name}</li>

const CountryInfo = ({ country }) => (
  <div>
    <p>Capital {country.capital}</p>
    <p>Population {country.population}</p>
    <h3>Spoken languages</h3>
    <ul>
      {country.languages
        .map(l => <Language key={l.iso639_1} name={l.name} />)}
    </ul>
  </div>
)

const Country = ({ country, weather, handleWeather }) => (
  
  <div>
    <h2>{country.name}</h2>
    <CountryInfo country={country} />
    <img src={country.flag} alt="country flag" width="20%" />
    <Weather capital={country.capital} weather={weather} handleWeather={handleWeather} />
  </div>
)

export default Country;