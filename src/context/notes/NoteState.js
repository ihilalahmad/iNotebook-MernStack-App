import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //get all notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWNmYTVlNzNlYWU1OWVjYjg1YjVhIn0sImlhdCI6MTY1NTgyMzM2OH0.SCsS3dDfgj9cAkRsAN58f4rQ9f150bsg5E31S8R6fBs",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWNmYTVlNzNlYWU1OWVjYjg1YjVhIn0sImlhdCI6MTY1NTgyMzM2OH0.SCsS3dDfgj9cAkRsAN58f4rQ9f150bsg5E31S8R6fBs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWNmYTVlNzNlYWU1OWVjYjg1YjVhIn0sImlhdCI6MTY1NTgyMzM2OH0.SCsS3dDfgj9cAkRsAN58f4rQ9f150bsg5E31S8R6fBs",
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit note in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //delete a note
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMWNmYTVlNzNlYWU1OWVjYjg1YjVhIn0sImlhdCI6MTY1NTgyMzM2OH0.SCsS3dDfgj9cAkRsAN58f4rQ9f150bsg5E31S8R6fBs",
      },
    });
    const json = response.json();
    console.log(json);

    console.log(`deleting a note with id ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
