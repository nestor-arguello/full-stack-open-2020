import React from 'react';

const Person = ({ person }) => (
  <div key={person.name}>
    {person.name} {person.number}
  </div>
);

const Persons = ({ persons, filterValue }) => (
  <div>
    {filterValue
      ? persons
          .filter(person =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map(person => <Person key={person.name} person={person} />)
      : persons.map(person => <Person key={person.name} person={person} />)}
  </div>
);

export default Persons;
