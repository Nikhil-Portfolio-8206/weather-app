import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [cityList, setCityList] = useState([]);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // Fetch Weather by City
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setCityList([]); // Clear suggestions once weather data is fetched
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  // Fetch City Suggestions
  const fetchCitySuggestions = async () => {
    if (!city) {
      setCityList([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${city}&type=like&appid=${API_KEY}`
      );
      setCityList(response.data.list);
    } catch (err) {
      setCityList([]);
    }
  };

  return (
    <div className="App">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          fetchCitySuggestions(); // Fetch city suggestions on input change
        }}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {/* Display Error Message */}
      {error && <p className="error">{error}</p>}

      {/* City Suggestions List */}
      {cityList.length > 0 && (
        <ul>
          {cityList.map((cityItem) => (
            <li
              key={cityItem.id}
              onClick={() => {
                setCity(cityItem.name); // Set city name from suggestions
                fetchWeather(); // Fetch weather for the selected city
              }}
            >
              {cityItem.name}, {cityItem.sys.country}
            </li>
          ))}
        </ul>
      )}

      {/* Display Weather Information */}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌦️ Weather: {weather.weather[0].description}</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
