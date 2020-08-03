import React from 'react';

const CityWeather = ({ weather }) => {
  const { temperature, weather_icons, wind_speed, wind_dir } = weather.current;
  const { name } = weather.location;

  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>
        <strong>Temperature: </strong>
        <span>{temperature} Celsius</span>
      </p>
      <div>
        {weather_icons.map((url, index) => (
          <img key={index} src={url} alt="weather" />
        ))}
      </div>
      <p>
        <strong>Wind: </strong>
        <span>
          {wind_speed} mph. Direction: {wind_dir}
        </span>
      </p>
    </div>
  );
};

export default CityWeather;