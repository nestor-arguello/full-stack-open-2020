import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewPersonChange = event => {
    const { value, name } = event.target;

    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  const handleFilterChange = event => setFilterValue(event.target.value);

  const addNewPerson = event => {
    event.preventDefault();

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (existingPerson) {
      if (newPerson.number === existingPerson.number) {
        alert(`${newPerson.name} is already added to Phonebook`);
      } else {
        if (
          window.confirm(
            `${newPerson.name} is already added to Phonbook, replace the old number with a new one?`
          )
        ) {
          const updatedPerson = { ...existingPerson, number: newPerson.number };

          personService
            .update(updatedPerson)
            .then(
              setPersons(
                persons.map(person =>
                  person.id === updatedPerson.id ? updatedPerson : person
                )
              )
            );

          setNewPerson({ name: '', number: '' });
        }
      }
    } else {
      personService
        .create(newPerson)
        .then(personCreated => setPersons(persons.concat(personCreated)));
      setNewPerson({ name: '', number: '' });
    }
  };

  const removePerson = personToRemove => () => {
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService.remove(personToRemove);
      setPersons(persons.filter(person => person.id !== personToRemove.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterValue} handleChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newPerson={newPerson}
        handleChange={handleNewPersonChange}
        handleClick={addNewPerson}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterValue={filterValue}
        handleRemove={removePerson}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
