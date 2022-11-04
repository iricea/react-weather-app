import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sat", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="WeatherForecastDay">
      <div className="ForecastDay">{day()}</div>
      <WeatherIcon id="icon" code={props.data.weather[0].icon} size={34} />
      <div className="ForecastTemperature">
        <span className="ForecastTemperatureDay">
          {Math.round(props.data.temp.max)}°
        </span>
        <span className="ForecastTemperatureNight">
          {Math.round(props.data.temp.min)}°
        </span>
      </div>
    </div>
  );
}
