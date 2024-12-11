// src/components/RegisterPatient.js

import React, { useState } from "react";
import axios from "axios";

function RegisterPatient() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const registerPatient = async () => {
    try {
      const response = await axios.post("http://localhost:4000/invoke", {
        fcn: "RegisterPatient",
        args: [id, name],
      });
      alert("Patient registered successfully");
      setId("");
      setName("");
    } catch (error) {
      console.error(error);
      alert("Error registering patient: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register Patient</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button onClick={registerPatient}>Register</button>
    </div>
  );
}

export default RegisterPatient;
