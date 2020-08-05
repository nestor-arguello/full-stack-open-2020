import React from 'react';

const Person = ({ person, handleRemove }) => (
  <div key={person.name}>
    {person.name} {person.number}{' '}
    <button onClick={handleRemove(person)}>delete</button>
  </div>
);

export default Person;
