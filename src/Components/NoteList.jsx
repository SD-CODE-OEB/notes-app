// components/NoteList.js
import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NoteList = () => {
  const PATH = process.env.REACT_APP_PATH;
  console.log(PATH);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const deleteNote = async (id) => {
    await axios
      .delete(`http://localhost:5000/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="note-container">
      <h1>Notes</h1>
      <div className="notes-box">
        {notes &&
          notes.map((note) => (
            <div className="note" key={note._id}>
              <div className="note-title">{note.title}</div>
              <div className="note-content">{note.content}</div>
              <div className="btns-box">
                <button
                  type="button"
                  className="note-edit"
                  onClick={() => {
                    navigate(`${PATH}/notes/${note._id}`);
                  }}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="note-delete"
                  onClick={() => deleteNote(note._id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        <button
          className="note add-note"
          onClick={() => {
            navigate(`${PATH}/notes/new`);
          }}
        >
          <CiCirclePlus className="plus-icon" />
          <span className="note-add-txt">Add a note</span>
        </button>
      </div>
    </div>
  );
};

export default NoteList;
