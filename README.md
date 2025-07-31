# Field Insights Dashboard

This is my submission for the Carbonleap Full Stack Intern take-home assignment. It's a complete web application that simulates ingesting, processing, and displaying farm sensor data.

**Live Demo:** `[PASTE YOUR LIVE DEMO URL HERE]`

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

## A Note on Test Data

To properly test the background processing feature, the repository includes a `data.json` file with 500 records. This was generated using the LLM prompt specified in the assignment details. You can copy and paste its contents into the submission form on the UI to test a large batch upload.
