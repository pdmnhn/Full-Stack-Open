import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import phonebook from "./services/phonebook";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [intervalID, setIntervalID] = useState(null);

  const createNotification = (message) => {
    clearTimeout(intervalID);

    setErrorMessage(message);

    setIntervalID(
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    );
  };
  useEffect(() => {
    phonebook.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const personsToShow =
    filterText === ""
      ? persons
      : persons.filter((obj) =>
          obj.name.toLowerCase().includes(filterText.toLowerCase())
        );

  const changeFilterText = (event) => {
    setFilterText(event.target.value);
  };

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons
        .map((obj) => obj.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result === true) {
        const existingPerson = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        phonebook
          .modifyPerson(existingPerson.id, {
            name: newName,
            number: newNumber,
          })
          .then((modifiedPerson) => {
            setPersons(
              persons.map((person) => {
                return person.id !== modifiedPerson.id
                  ? person
                  : modifiedPerson;
              })
            );
            createNotification(`Changed ${newName}`);
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
            createNotification(
              `Information of ${newName} has already been removed from server`
            );
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      phonebook.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        createNotification(`Added ${newName}`);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`) === false) return;
    phonebook.deletePerson(id);
    setPersons(persons.filter((person) => person.id !== id));
    createNotification(`Deleted ${name}`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filterText={filterText} changeFilterText={changeFilterText} />
      <h1>add a new</h1>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
      />
      <h1>Numbers</h1>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
