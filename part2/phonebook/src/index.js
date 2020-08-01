import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filterValue, setFilterValue] = useState('');

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

    const personExist = persons.find(
      person => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (personExist) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
      setNewPerson({ name: '', number: '' });
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

      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
