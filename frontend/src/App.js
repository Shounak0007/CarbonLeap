// frontend/src/App.js

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./Dashboard";
import ReadingForm from "./ReadingForm";

const API_URL = "http://localhost:8000";

function App() {
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState("");
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);

  const fetchReadings = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/readings/`);
      setReadings(response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      setError("");
    } catch (err) {
      console.error("Error fetching readings:", err);
      setError("Failed to fetch sensor readings.");
    }
  }, []);

  useEffect(() => {
    fetchReadings();
  }, [fetchReadings]);

  useEffect(() => {
    if (!jobId) return;

    setJobStatus({ status: "PENDING" });

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs/${jobId}`);
        const currentStatus = response.data;
        setJobStatus(currentStatus);

        if (currentStatus.status === "SUCCESS" || currentStatus.status === "FAILURE") {
          clearInterval(intervalId);
          if (currentStatus.status === "SUCCESS") {
            fetchReadings();
          }
        }
      } catch (err) {
        console.error("Error fetching job status:", err);
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [jobId, fetchReadings]);

  return (
    <div className="App">
      <h1>Field Insights Dashboard</h1>

      <ReadingForm setJobId={setJobId} />

      {jobStatus && (
        <div className={`job-status ${jobStatus.status.toLowerCase()}`}>
          Job Status: {jobStatus.status}
          {jobStatus.status === "SUCCESS" && ` | Processed: ${jobStatus.result.processed_records} records.`}
          {jobStatus.status === "FAILURE" && ` | Error: ${jobStatus.result.message}`}
        </div>
      )}

      <Dashboard readings={readings} error={error} />
    </div>
  );
}

export default App;
