import React, { useEffect } from 'react';
import axios from 'axios';

const Line = ({ bold, text }) => <p><b>{bold}</b>{text}</p>

const Weather = ({ capital, weather, handleWeather }) => {

  const access_key = process.env.REACT_APP_API_KEY

  const weatherHook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`)
      .then(response => {
        console.log(response.data.current)
        handleWeather(response.data.current)
      })
  }

  useEffect(weatherHook, [])

  if (weather.length === 0)
    return <div></div>
  else {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <Line bold='Temperature: ' text={weather.temperature + ' Celsius'} />
        <img src={weather.weather_icons[0]} alt="weather icon" />
        <Line bold='Wind: ' text={weather.wind_speed + ' mph direction ' + weather.wind_dir} />
      </div>
    )
  }
}

export default Weather;