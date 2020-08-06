import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import personService from './services/persons';

import './index.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState(null);

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

  const showNotification = ({ message, alertClass, delay }) => {
    setNotification({
      message,
      alertClass,
    });
    setTimeout(() => {
      setNotification(null);
    }, delay);
  };

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
            .then(response => {
              setPersons(
                persons.map(person =>
                  person.id === updatedPerson.id ? updatedPerson : person
                )
              );
              showNotification({
                message: `${updatedPerson.name} has been updated`,
                alertClass: 'success',
                delay: 3000,
              });
              setNewPerson({ name: '', number: '' });
            })
            .catch(error => {
              showNotification({
                message: `Information of ${updatedPerson.name} has already been removed from server`,
                alertClass: 'error',
                delay: 3000,
              });
              setPersons(
                persons.filter(person => person.id !== updatedPerson.id)
              );
            });
        }
      }
    } else {
      personService
        .create(newPerson)
        .then(personCreated => setPersons(persons.concat(personCreated)));
      showNotification({
        message: `${newPerson.name} has been added`,
        alertClass: 'success',
        delay: 3000,
      });
      setNewPerson({ name: '', number: '' });
    }
  };

  const removePerson = personToRemove => () => {
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService
        .remove(personToRemove)
        .then(response => {
          showNotification({
            message: `${personToRemove.name} has been removed`,
            alertClass: 'success',
            delay: 3000,
          });
        })
        .catch(error => {
          showNotification({
            message: `Information of ${personToRemove.name} has already been removed from server`,
            alertClass: 'error',
            delay: 3000,
          });
        });
      setPersons(persons.filter(person => person.id !== personToRemove.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />
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
