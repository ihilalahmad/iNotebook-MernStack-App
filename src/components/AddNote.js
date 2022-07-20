import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    noteTitle: "",
    noteDescription: "",
    noteTag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.noteTitle, note.noteDescription, note.noteTag);
    props.showAlert("Note added successfully", "success");
    setNote({
      noteTitle: "",
      noteDescription: "",
      noteTag: "",
    });
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="container mt-3">
        <h1>Add a Note</h1>
        <form className="mt-3">
          <div className="mb-3">
            <label htmlFor="noteTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="noteTitle"
              name="noteTitle"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.noteTitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="noteDescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="noteDescription"
              name="noteDescription"
              onChange={onChange}
              value={note.noteDescription}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="noteTag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="noteTag"
              name="noteTag"
              onChange={onChange}
              value={note.noteTag}
            />
          </div>

          <button
            disabled={
              note.noteTitle.length < 5 || note.noteDescription.length < 5
            }
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
