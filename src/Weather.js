import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const apiKey = "c6cb65a19d9148cf4b429a8260e0f527";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ loaded: false });
  const [cityName, setCityName] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    axios.get(cityUrl).then(lookupWeather);
    axios.get(cityUrl).then(showCity);
    function showCity(response) {
      setCityName(response.data[0].name);
    }
  }

  function changeCity(event) {
    setCity(event.target.value);
  }
  function lookupWeather(response) {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${apiKey}&units=metric`;
    axios.get(weatherUrl).then(showWeather);
  }
  function showWeather(response) {
    setWeather({
      loaded: true,
      temperature: Math.round(response.data.main.temp),
      date: "Wednesday 07:00",
      description: response.data.weather[0].description,
      wind: Math.round(response.data.wind.speed),
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-9">
          <input
            type="search"
            placeholder="Search for a city"
            className="form-control"
            autoFocus="on"
            onChange={changeCity}
          />{" "}
        </div>
        <div className="col-3">
          <input
            type="submit"
            value="Search"
            className="btn btn-primary w-100"
          />
        </div>
      </div>
    </form>
  );

  if (weather.loaded) {
    return (
      <div className="Weather">
        {form}
        <h1>{cityName}</h1>
        <ul>
          <li>{weather.date}</li>
          <li className="text-capitalize">{weather.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <img src={weather.icon} alt={weather.description} />
            <div className="d-inline-block">
              <span className="temperature">{weather.temperature}</span>
              <span className="unit"> °C</span>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Humidity: {weather.humidity}%</li>
              <li>Wind: {weather.wind} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    // let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${props.defaultCity.lat}&lon=${props.defaultCity.lon}&appid=${apiKey}&units=metric`;
    // axios.get(weatherUrl).then(showWeather);
    return <div>{form}</div>;
  }
}
