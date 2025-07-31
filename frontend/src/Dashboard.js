import React from "react";

const Dashboard = ({ readings, error }) => {
  return (
    <div className="dashboard">
      <h2>Sensor Readings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Field ID</th>
            <th>Sensor Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {readings.length > 0 ? (
            readings.map(reading => (
              <tr key={reading.id}>
                <td>{new Date(reading.timestamp).toLocaleString()}</td>
                <td>{reading.field_id}</td>
                <td>{reading.sensor_type}</td>
                <td>
                  {reading.reading_value} {reading.unit}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No sensor readings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
