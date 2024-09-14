// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteList from "./Components/NoteList";
import "./Components/Notes.css";
import NoteForm from "./Components/NoteForm";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/notes/new" element={<NoteForm />} />
        <Route path="/notes/:id" element={<NoteForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
