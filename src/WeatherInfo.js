import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import "./WeatherInfo.css";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1>{props.city}</h1>
      <ul>
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>
      <div className="row mt-3">
        <div className="col-6 pt-3">
          <ul>
            <li>Humidity: {props.data.humidity}%</li>
            <li>Wind: {props.data.wind} km/h</li>
          </ul>
        </div>
        <div className="col-6">
          <WeatherIcon code={props.data.icon} size={46} />
          <div className="d-inline-block">
            <div className="WeatherTemperature">
              <span className="temperature">{props.data.temperature}</span>
              <span className="unit"> °C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
