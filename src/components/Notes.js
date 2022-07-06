import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    eNoteTitle: "",
    eNoteDescription: "",
    eNoteTag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      eNoteTitle: currentNote.title,
      eNoteDescription: currentNote.description,
      eNoteTag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    console.log("updating note ");
    editNote(note.id, note.eNoteTitle, note.eNoteDescription, note.eNoteTag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AddNote />
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="mt-3">
                  <div className="mb-3">
                    <label htmlFor="eNoteTitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eNoteTitle"
                      name="eNoteTitle"
                      aria-describedby="emailHelp"
                      value={note.eNoteTitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eNoteDescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eNoteDescription"
                      name="eNoteDescription"
                      value={note.eNoteDescription}
                      onChange={onChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="noteTag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="eNoteTag"
                      name="eNoteTag"
                      value={note.eNoteTag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    note.eNoteTitle.length < 5 ||
                    note.eNoteDescription.length < 5
                  }
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container row mt-3">
        <h2>Your Notes</h2>
        <h4>{notes.length === 0 && "No notes to display"}</h4>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
