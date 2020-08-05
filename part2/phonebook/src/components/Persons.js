import React from 'react';

import Person from './Person';

const Persons = ({ persons, filterValue, handleRemove }) => {
  const renderPerson = person => (
    <Person key={person.name} person={person} handleRemove={handleRemove} />
  );

  return (
    <div>
      {filterValue
        ? persons
            .filter(person =>
              person.name.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map(renderPerson)
        : persons.map(renderPerson)}
    </div>
  );
};

export default Persons;
