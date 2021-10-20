import React from "react";

export default function PersonForm({
  addPerson,
  newName,
  changeName,
  newNumber,
  changeNumber,
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={changeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
