// src/components/GetPatient.js

import React, { useState } from "react";
import axios from "axios";

function GetPatient() {
  const [id, setId] = useState("");
  const [patient, setPatient] = useState(null);

  const getPatient = async () => {
    try {
      const response = await axios.post("http://localhost:4000/query", {
        fcn: "GetPatient",
        args: [id],
      });
      setPatient(response.data.result);
    } catch (error) {
      console.error(error);
      alert("Error fetching patient data: " + error.message);
    }
  };

  return (
    <div>
      <h2>Get Patient Data</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <button onClick={getPatient}>Get Data</button>
      {patient && (
        <div>
          <h3>Patient Details:</h3>
          <pre>{JSON.stringify(patient, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GetPatient;
