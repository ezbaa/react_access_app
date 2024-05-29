import React, { useState } from "react";
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { Doors } from "./Doors.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doors" element={<Doors />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
