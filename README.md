# Field Insights Dashboard

This project is a full-stack web application built for the Carbonleap Full Stack Intern assignment. It simulates a real-world IoT system for ingesting, processing, and analyzing farm sensor data like temperature and soil moisture.
The core of the project is a backend API that handles data submission and runs background jobs, with a simple React frontend to visualize the data and interact with the system.

## Links
- **FrontEnd:** `[https://pleasing-solace-production.up.railway.app/]`
- **Backend:** `[https://carbonleap-production.up.railway.app/]`

## Core Technologies

- **Backend:** Python, FastAPI, Celery
- **Frontend:** React
- **Database:** PostgreSQL
- **Infrastructure:** Docker, Docker Compose, Redis

## How to Run Locally

You'll need **Docker Desktop** installed and running on your machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shounak0007/CarbonLeap.git
    cd CarbonLeap
    ```
2.  **Run with Docker Compose:**
    ```bash
    docker compose up --build
    ```
3.  **Access the app:**
    - **Frontend UI:** [http://localhost:3000](http://localhost:3000)
    - **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
  

## API Endpoints

| Method | Path              | Description                                            |
| :----- | :---------------- | :----------------------------------------------------- |
| `POST` | `/readings/`      | Submits a single sensor reading synchronously.         |
| `GET`  | `/readings/`      | Retrieves a list of all sensor readings.               |
| `POST` | `/readings/batch` | Submits a batch of readings for background processing. |
| `GET`  | `/jobs/{job_id}`  | Checks the status of a background job.                 |

## Data Generation

To realistically test the asynchronous processing capabilities and populate the dashboard with meaningful data, I generated a test dataset of 500 records.
I used Google's Gemini with the following prompt, as recommended by the assignment:

```
Generate 500+ farm sensor readings as a table or CSV. Each reading must have:
timestamp (ISO 8601, UTC),
field_id (e.g., 'field_1', 'field_2', ...),
sensor_type (one of: soil_moisture, temperature, humidity, ph, sunlight, rainfall, wind_speed, soil_nitrogen),
reading_value (in a realistic range for the type),
unit (see below).
Output as CSV or JSONL.
```

The resulting file, `farm_sensor_readings.json`, is included in the root of this repository.


## A Note on Test Data

To properly test the background processing feature, the repository includes a `farm_sensor_readings.json` file with 500 records. This was generated using the LLM prompt specified in the assignment details.
