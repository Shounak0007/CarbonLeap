import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const exampleJSON = JSON.stringify(
  [
    {
      timestamp: new Date().toISOString(),
      field_id: "field-delta",
      sensor_type: "sunlight",
      reading_value: 1250,
      unit: "W/m²"
    },
    {
      timestamp: new Date().toISOString(),
      field_id: "field-delta",
      sensor_type: "rainfall",
      reading_value: 2.5,
      unit: "mm"
    }
  ],
  null,
  2
);

const ReadingForm = ({ onNewReadings, setJobId }) => {
  const [formData, setFormData] = useState(exampleJSON);
  const [error, setError] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");

    let readings;
    try {
      readings = JSON.parse(formData);
    } catch (err) {
      setError("Invalid JSON format. Please check your data.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/readings/batch`, readings);
      const newJobId = response.data.job_id;

      setJobId(newJobId);
    } catch (err) {
      console.error("Error submitting readings:", err);
      setError("Failed to submit readings. Please check the console.");
    }
  };

  return (
    <div className="form-container">
      <h2>Submit New Sensor Readings (as JSON)</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={formData}
          onChange={e => setFormData(e.target.value)}
          rows="15"
          style={{ fontFamily: "monospace" }}
        />
        <button type="submit">Submit Batch for Processing</button>
      </form>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
};

export default ReadingForm;
