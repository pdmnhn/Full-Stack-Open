import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2021
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    noteService.getAll().then((allNotes) => {
      setNotes(allNotes.concat({ content: "FAKE", importance: true }));
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((newNote) => {
      setNotes(notes.concat(newNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    return (event) => {
      const note = notes.find((n) => n.id === id);
      const changedNote = { ...note, important: !note.important };

      noteService
        .update(id, changedNote)
        .then((receivedNote) => {
          setNotes(notes.map((note) => (note.id !== id ? note : receivedNote)));
        })
        .catch((error) => {
          setErrorMessage(
            `Note "${note.content}" was already removed from server`
          );
          setInterval(() => setErrorMessage(null), 5000);
          setNotes(notes.filter((n) => n.id !== id));
        });
    };
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          placeholder="a new note..."
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
