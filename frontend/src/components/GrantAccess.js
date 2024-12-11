// src/components/GrantAccess.js

import React, { useState } from "react";
import axios from "axios";

function GrantAccess() {
  const [patientId, setPatientId] = useState("");
  const [providerId, setProviderId] = useState("");

  const grantAccess = async () => {
    try {
      const response = await axios.post("http://localhost:4000/invoke", {
        fcn: "GrantAccess",
        args: [patientId, providerId],
      });
      alert("Access granted successfully");
      setPatientId("");
      setProviderId("");
    } catch (error) {
      console.error(error);
      alert("Error granting access: " + error.message);
    }
  };

  return (
    <div>
      <h2>Grant Access</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Provider ID"
        value={providerId}
        onChange={(e) => setProviderId(e.target.value)}
      />
      <br />
      <button onClick={grantAccess}>Grant Access</button>
    </div>
  );
}

export default GrantAccess;
