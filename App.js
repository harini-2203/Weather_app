import React, { useState } from "react";
import axios from "axios";
import './App.css';

const API_KEY = "e066eafa169863212aa26ee71e53b3fc"; // Replace with your API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(""); // Clear error message if successful
    } catch (error) {
      setError("City not found. Please try again.");
      setWeather(null); // Clear weather data on error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className="app">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
