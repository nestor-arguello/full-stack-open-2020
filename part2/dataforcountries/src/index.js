import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Country from './components/Country';
import CityWeather from './components/CityWeather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const city = selectedCountry.capital;

      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
        )
        .then(response => {
          setWeatherData(response.data);
        });
    }
  }, [selectedCountry, api_key]);

  const handleFilterChange = event => {
    const { value } = event.target;
    const countriesFiltered = countries.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilterValue(value);
    setFilteredCountries(countriesFiltered);

    if (countriesFiltered.length === 1) {
      setSelectedCountry(countriesFiltered[0]);
    } else {
      setSelectedCountry(null);
      setWeatherData(null);
    }
  };

  const showCountry = country => () => {
    setSelectedCountry(country);
    setFilteredCountries([country]);
    setWeatherData(null);
  };

  const countriesList = filterValue ? (
    filteredCountries.length > 10 ? (
      <div>Too many matches, specify another filter</div>
    ) : filteredCountries.length === 1 ? null : (
      filteredCountries.map(country => (
        <div key={country.name}>
          {country.name}
          <button onClick={showCountry(country)}>show</button>
        </div>
      ))
    )
  ) : null;

  return (
    <div>
      <div>
        <span>Find countries </span>
        <input value={filterValue} onChange={handleFilterChange} />
      </div>
      <div>{countriesList}</div>
      {selectedCountry && <Country country={selectedCountry} />}
      {selectedCountry && weatherData && <CityWeather weather={weatherData} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
