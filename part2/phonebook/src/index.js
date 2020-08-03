import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
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
