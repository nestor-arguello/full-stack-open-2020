import React from 'react';

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;

  return (
    <div>
      <h1>{name}</h1>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <div>
        <img src={flag} alt="flag" style={{width: '130px', height: 'auto'}} />
      </div>
    </div>
  );
};

export default Country;
