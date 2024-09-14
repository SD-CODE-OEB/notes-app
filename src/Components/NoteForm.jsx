// components/NoteForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CiSquareChevLeft } from "react-icons/ci";

const NoteForm = () => {
  const PATH = process.env.REACT_APP_PATH;
  const B_PATH = process.env.BACKEND_APP_PATH;
  const [note, setNote] = useState({ title: "", content: "" });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${B_PATH}/notes/${id}`)
      .then((res) => {
        const data = res.data;
        setNote((prev) => ({
          ...prev,
          title: data.title,
          content: data.content,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(id);
  const navigate = useNavigate();
  const handleNote = async (e) => {
    try {
      if (id) {
        await axios.put(`${B_PATH}/notes/${id}`, note).then(() => {
          console.log("updated");
          navigate(`${PATH}`);
        });
      } else {
        await axios.post(`${B_PATH}/notes/new`, note).then(() => {
          navigate(`${PATH}`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form-container">
      <h1>Add a Note</h1>
      <Link to={`${PATH}`}>
        <div className="navigate-back">
          <CiSquareChevLeft className="icon" id="back" />
          <label htmlFor="back">Go back</label>
        </div>
      </Link>
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={note.title}
          onChange={(e) =>
            setNote((note) => ({ ...note, title: e.target.value }))
          }
          placeholder="Reason to Write"
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={note.content}
          onChange={(e) =>
            setNote((note) => ({ ...note, content: e.target.value }))
          }
          placeholder="Release your thoughts"
        ></textarea>
      </p>
      <p>
        <button type="button" onClick={handleNote}>
          Save
        </button>
      </p>
    </div>
  );
};

export default NoteForm;
