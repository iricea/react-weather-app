import React from "react";
import "./WeatherForecast.css";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecast() {
  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="ForecastDay">Thu</div>
          <WeatherIcon id="icon" code="02d" size={38} />
          <div className="ForecastTemperature">
            <span className="ForecastTemperatureDay">19°</span>
            <span className="ForecastTemperatureNight">10°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
