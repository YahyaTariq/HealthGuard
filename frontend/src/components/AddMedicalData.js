// src/components/AddMedicalData.js

import React, { useState } from "react";
import axios from "axios";

function AddMedicalData() {
  const [patientId, setPatientId] = useState("");
  const [dataHash, setDataHash] = useState("");

  const addMedicalData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/invoke", {
        fcn: "AddMedicalData",
        args: [patientId, dataHash],
      });
      alert("Medical data added successfully");
      setPatientId("");
      setDataHash("");
    } catch (error) {
      console.error(error);
      alert("Error adding medical data: " + error.message);
    }
  };

  return (
    <div>
      <h2>Add Medical Data</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Data Hash (e.g., IPFS hash)"
        value={dataHash}
        onChange={(e) => setDataHash(e.target.value)}
      />
      <br />
      <button onClick={addMedicalData}>Add Data</button>
    </div>
  );
}

export default AddMedicalData;
