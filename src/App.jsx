import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: (data.wind.speed * 3.6).toFixed(2), // Convert to km/h
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
        setCity("");
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  return (
    <div className="container">
      <form className="search-bar" onSubmit={SubmitHandler}>
        <input
          type="text"
          name="city"
          value={city}
          onChange={changeHandler}
          placeholder="Enter city name"
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>

      {weatherData && (
        <div>
          <div className="weather-icon">
            <img src={weatherData.icon} alt="Weather Icon" />
          </div>
          <div className="temperature">
            {weatherData.temperature}°C
          </div>
          <div className="location">{weatherData.location}</div>
          <div className="weather-details">
            <div className="weather-detail">
              <i className="fas fa-water"></i>
              <span>{weatherData.humidity}%</span>
              <div className="detail-label">Humidity</div>
            </div>
            <div className="weather-detail">
              <i className="fas fa-wind"></i>
              <span>{weatherData.windSpeed} km/h</span>
              <div className="detail-label">Wind Speed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
