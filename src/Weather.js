import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {/* Display Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Display Weather Information */}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather-icon"
            style={{ width: "50px", height: "50px" }}
          />
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌦️ Weather: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          <p>🌬️ Pressure: {weather.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
