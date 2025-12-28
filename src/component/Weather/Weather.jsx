"use client";

import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ WeatherAPI key
  const API_KEY = "7b3bccf8b0e54d9590195436250312";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      setWeather([]);

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      // ✅ 7-day forecast
      setWeather(data.forecast.forecastday);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">
      <h2>7-Day Weather Forecast</h2>

      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading weather...</p>}
      {error && <p className="error">{error}</p>}

      {weather.length > 0 && (
        <div className="weather-grid">
          {weather.map((day, i) => (
            <div key={i} className="weather-card">
              <p className="date">{new Date(day.date).toDateString()}</p>

              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />

              <p>{day.day.condition.text}</p>
              <h3>{Math.round(day.day.avgtemp_c)}°C</h3>

              <small>🌧 Rain: {day.day.daily_chance_of_rain}%</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
