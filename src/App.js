// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteList from "./Components/NoteList";
import "./Components/Notes.css";
import NoteForm from "./Components/NoteForm";
const App = () => {
  const PATH = process.env.REACT_APP_PATH;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${PATH}/`} element={<NoteList />} />
        <Route path={`${PATH}/notes/new`} element={<NoteForm />} />
        <Route path={`${PATH}/notes/:id`} element={<NoteForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
