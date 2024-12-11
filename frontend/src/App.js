// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterPatient from "./components/RegisterPatient";
import GetPatient from "./components/GetPatient";
import GrantAccess from "./components/GrantAccess";
import RevokeAccess from "./components/RevokeAccess";
import AddMedicalData from "./components/AddMedicalData";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Healthcare Blockchain System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register Patient</Link>
            </li>
            <li>
              <Link to="/get">Get Patient Data</Link>
            </li>
            <li>
              <Link to="/grant">Grant Access</Link>
            </li>
            <li>
              <Link to="/revoke">Revoke Access</Link>
            </li>
            <li>
              <Link to="/add">Add Medical Data</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterPatient />} />
          <Route path="/get" element={<GetPatient />} />
          <Route path="/grant" element={<GrantAccess />} />
          <Route path="/revoke" element={<RevokeAccess />} />
          <Route path="/add" element={<AddMedicalData />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>Welcome to the Healthcare Blockchain System</h2>
    <p>Select an option from the navigation menu.</p>
  </div>
);

export default App;
