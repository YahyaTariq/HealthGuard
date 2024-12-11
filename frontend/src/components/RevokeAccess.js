// src/components/RevokeAccess.js

import React, { useState } from "react";
import axios from "axios";

function RevokeAccess() {
  const [patientId, setPatientId] = useState("");
  const [providerId, setProviderId] = useState("");

  const revokeAccess = async () => {
    try {
      const response = await axios.post("http://localhost:4000/invoke", {
        fcn: "RevokeAccess",
        args: [patientId, providerId],
      });
      alert("Access revoked successfully");
      setPatientId("");
      setProviderId("");
    } catch (error) {
      console.error(error);
      alert("Error revoking access: " + error.message);
    }
  };

  return (
    <div>
      <h2>Revoke Access</h2>
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
      <button onClick={revokeAccess}>Revoke Access</button>
    </div>
  );
}

export default RevokeAccess;
