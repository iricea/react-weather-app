import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function Weather(props) {
  const apiKey = "c6cb65a19d9148cf4b429a8260e0f527";
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({ loaded: false });
  const [cityName, setCityName] = useState(props.defaultCity);
  function handleSubmit(event) {
    event.preventDefault();
    let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    axios.get(cityUrl).then(lookupWeather);
    axios.get(cityUrl).then(showCity);
    function showCity(response) {
      setCityName(response.data[0].name);
    }
  }

  function searchDefault() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }
  function lookupWeather(response) {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${apiKey}&units=metric`;
    axios.get(weatherUrl).then(showWeather);
  }
  function showWeather(response) {
    console.log(response.data);
    setWeather({
      loaded: true,
      temperature: Math.round(response.data.main.temp),
      date: new Date(response.data.dt * 1000),
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
          <li>
            <FormattedDate date={weather.date} />
          </li>
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
    searchDefault();
    return <div>{form}</div>;
  }
}
