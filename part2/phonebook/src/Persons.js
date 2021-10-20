import React from "react";

export default function Persons({ persons, deletePerson }) {
  return persons.map(({ name, number, id }) => (
    <div key={id}>
      {name} {number}{" "}
      <button onClick={() => deletePerson(name, id)}>delete</button>
    </div>
  ));
}
